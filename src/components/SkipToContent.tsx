const SkipToContent = () => {
  const skipToMain = () => {
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }

  return (
    <button 
      className="skip-to-content"
      onClick={skipToMain}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          skipToMain()
        }
      }}
    >
      Skip to main content
    </button>
  )
}

export default SkipToContent