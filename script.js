document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("pre code")

  codeBlocks.forEach((block) => {
    if (block.classList.contains("language-js")) {
      const content = block.innerHTML
      
      const keywords = [
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "import",
        "export",
        "from",
        "this",
        "new",
        "true",
        "false",
        "null",
        "undefined",
      ]

      let highlighted = content

      highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span style="color: #22c55e;">$&</span>')

      highlighted = highlighted.replace(/(\/\/.*)/g, '<span style="color: #94a3b8;">$&</span>')

      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g")
        highlighted = highlighted.replace(regex, `<span style="color: #ec4899;">$&</span>`)
      })

      highlighted = highlighted.replace(/(\w+)(\s*\()/g, '<span style="color: #3b82f6;">$1</span>$2')

      highlighted = highlighted.replace(/(\.\w+)/g, '<span style="color: #f59e0b;">$&</span>')

      block.innerHTML = highlighted
    }
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: "smooth",
        })
      }
    })
  })

  const navToggle = document.createElement("button")
  navToggle.className = "nav-toggle"
  navToggle.innerHTML = "☰"
  navToggle.style.display = "none"

  const nav = document.querySelector("nav .container")
  const navLinks = document.querySelector(".nav-links")

  if (window.innerWidth <= 640) {
    navToggle.style.display = "block"
    navLinks.style.display = "none"
    nav.insertBefore(navToggle, navLinks)

    navToggle.addEventListener("click", () => {
      if (navLinks.style.display === "none") {
        navLinks.style.display = "flex"
        navLinks.style.flexDirection = "column"
        navLinks.style.width = "100%"
        navLinks.style.marginTop = "1rem"
      } else {
        navLinks.style.display = "none"
      }
    })
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 640) {
      if (navToggle.style.display === "none") {
        navToggle.style.display = "block"
        navLinks.style.display = "none"
        nav.insertBefore(navToggle, navLinks)
      }
    } else {
      navToggle.style.display = "none"
      navLinks.style.display = "flex"
      navLinks.style.flexDirection = "row"
    }
  })
})

