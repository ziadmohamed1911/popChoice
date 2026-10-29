const searchInput = document.getElementById("search-input")
const searchbtn =  document.getElementById("btn")



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