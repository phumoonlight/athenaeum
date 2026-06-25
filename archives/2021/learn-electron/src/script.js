const showInput = () => {
  const inputElement = document.getElementsByName('test')[0]
  const outputElement = document.getElementsByClassName('test-output-wrapper')[0]
  outputElement.innerHTML = inputElement.value
}