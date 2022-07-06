const form = document["my-form"] // because form name has a dash, then use bracket syntax. If not dash use period

// Submit event
form.addEventListener("submit", function(e) {
    e.preventDefault() // to stop refreshing the page after submit button is clicked. ALWAYS NEEDED AFTER SUBMIT EVENT
    
    const firstName = form.firstName.value // to select the text from the input; grab the value (name, text)
    const lastName = form.lastName.value
    form.firstName.value = "" // clear form for the user after text submit    
    form.lastName.value = ""

    console.log(firstName + " " + lastName) // to console the inputs

    //to put it on the DOM
    // 1. <h1></h1>
    const h1 = document.createElement("h1")
    // 2. <h1>Harry Potter</h1>
    h1.textContent = firstName + " " + lastName
    //3. Append
    document.getElementsByTagName("body")[0].append(h1)
})
