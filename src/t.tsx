// @Comp
class C {
    night = false
    fruits = ["🍎", "🍊", "🥑"]
  
    View() {
      h1("hello, dlight js")
  
      for (const fruit of this.fruits) {
        div(fruit)
      }
  
      button("toggle")
        .class("toggle")
        .onClick(() => {
          this.night = !this.night
        })
  
      if (this.night) {
        "🌙"
        "✨"
        "🌟"
      } else {
        "🔆"
      }
    }
  }