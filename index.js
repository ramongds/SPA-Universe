const routes = {
    "/": "/pages/home.html",
    "/universe": "/pages/universe.html",
    "/exploration": "/pages/exploration.html",
    404: "/pages/404.html",
  }

  function route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    handle()
    setActiveLink()
  }

  function handle() {
    const { pathname }  = window.location
    const route = routes[pathname]  || routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector("#app").innerHTML = html
    })

  }
  handle()
  window.onpopstate = () => handle()
  window.route = () => route()


  function setActiveLink() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll("#header ul li a");
      navLinks.forEach(function(link) {
          link.classList.remove("active");
      });

      navLinks.forEach(function(link) {
          if (link.getAttribute("href") === currentPath) {
              link.classList.add("active");
          }
      });
  }
  document.addEventListener("DOMContentLoaded", setActiveLink);