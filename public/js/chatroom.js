(function connect(){
    let socket = io.connect('http://localhost:3000')

    let usernameInput = document.querySelector("#username")
    let usernameButton = document.querySelector("#usernameBtn")
    let usernameShow = document.querySelector("#usernameShow")
    let messageInput = document.querySelector("#message")
    let messageButton = document.querySelector("#messageBtn")
    let messageList = document.querySelector("#message-list")
    let typing = document.querySelector("#typing")

    usernameButton.addEventListener("click", e=>{
        let username = usernameInput.value
        // console.log(username)
        socket.emit("change_name", {username})
        usernameShow.textContent = username
        usernameInput.value = ""
    })

    messageButton.addEventListener("click", e=>{
        let message = messageInput.value
        // console.log(message)
        socket.emit("send_message", {message})
        messageInput.value = ""
    })

    socket.on("receive_message", data => {
        // console.log(data)
        let listItem = document.createElement("li")
        listItem.textContent = data.username + ": " + data.message
        listItem.classList.add("list-group-item")
        messageList.appendChild(listItem)
    })

    messageInput.addEventListener("keypress", e=>{
        socket.emit("typing")
    })

    socket.on("typing", data=>{
        typing.textContent = data.username + " is typing..."
        setTimeout(() => {typing.textContent=''}, 5000)
    })

})()