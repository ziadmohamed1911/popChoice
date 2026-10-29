const textAreas = document.querySelectorAll("textarea")


function autoResize(textarea){
  textarea.style.height = "auto"
  textarea.style.height = textarea.scrollHeight + "px"
}

function fitToplacehodler(textarea){
  const original = textarea.value
  textarea.value = textarea.placeholder
  autoResize(textarea)
  textarea.value = original
}

textAreas.forEach((textarea) => {
  if(textarea.value){
    autoResize(textarea)
  }else{
    fitToplacehodler(textarea)
  }

  textarea.addEventListener("input", () =>{
    if(textarea.value){
      autoResize(textarea)
    }else{
      fitToplacehodler(textarea)
    }
  })
})


searchbtn.addEventListener("click", (e) =>{
  e.preventDefault()
  handleSearch()
})

async function handleSearch(){
  const searchQuery= searchInput.value

  const response = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({searchQuery: searchQuery})
  })
  const data = await response.json()
  console.log(data)
}