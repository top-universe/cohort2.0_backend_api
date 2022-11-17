class Response {
    static success(data) {
      return this.ObjectComposer(data)
    }

    static error (data) {
        return this.ObjectComposer(data)
    }

    static ObjectComposer(data) {
        let responseObject =  {
            success: data.success,
            message: data.message,
          }
          
          if (data.data) 
          {responseObject.data = data.data}
          
          return responseObject
    }
}

let data = {
    email: "solomonmarvel@hotmail.com",
    id: "01928741924jak9384"
}

console.log(Response.error({success : "failed", message: "Request failed"}))
console.log(Response.error({success : "ok", message: "Request was successful", data: data}))

// if(success === "ok") {

// }