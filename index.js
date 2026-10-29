const textAreas = document.querySelectorAll("textarea")
const favMovieInput = document.getElementById("fav-movie")
const eraPreferenceInput = document.getElementById("era-preference")
const toneInput = document.getElementById("tone")
const searchBtn = document.getElementById("submit-btn")
const questionsPage= document.getElementById("form-page")
const answerPage = document.getElementById("answer-page")
const questionsForm = document.querySelector(".questions")

searchBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const favMovie= favMovieInput.value
  const eraPreference = eraPreferenceInput.value
  const tone = toneInput.value
  const searchQuery = `${favMovie}, ${eraPreference}, ${tone}`
  handleSearch(searchQuery)
})


async function handleSearch(searchQuery){
  
  try{
  searchBtn.textContent = "Searching...."
  const response = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({searchQuery: searchQuery})
  })
  const data = await response.json()

  const safeHtml = DOMPurify.sanitize(data)
  renderResult(safeHtml)
  }catch(err){

    console.error(err)

  }finally{

    searchBtn.textContent = "Let's Go"

  }
 
}

function renderResult(html){
  questionsPage.classList.add("hidden")
  answerPage.classList.remove("hidden")
  answerPage.innerHTML=`
  <div class="movie">
    ${html}
  </div>
  <button class="btn" id="reset-btn">Go Again</button>
  `
  document.getElementById("reset-btn").addEventListener("click", () =>{
  questionsPage.classList.remove("hidden")
  answerPage.classList.add("hidden")
  questionsForm.reset()
})

}


// resize textareas


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

document.fonts.ready.then(
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
)

