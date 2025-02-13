const hello_world = (req, res)=> {
    return res.send("hello world")
}

const hello_friend = (req, res) => {
    return res.send("hello friend")
}

module.exports =   {
    hello_friend,
    hello_world
}