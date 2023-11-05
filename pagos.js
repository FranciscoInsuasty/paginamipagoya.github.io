const paypalSoftware = () => {
    const toggle = document.getElementById("menu__toggle"),
      displayButton = document.getElementById("welcome__display__button"),
      xButton = document.getElementById("x-button"),
      tourButton = document.getElementById("tour__button__play");
  
    const openMenu = () => {
      document.body.classList.toggle("menu-open");
    };
  
    const showTour = element => {
      let tourContainer = document.querySelector(element);
      return () => {
        tourContainer.classList.toggle("show");
        if (!tourContainer.classList.contains("show")) {
          setTimeout(() => {
            tourContainer.style.visibility = "hidden";
          }, 500);
        } else {
          tourContainer.style.visibility = "visible";
        }
      };
    };
  
    const animation = (el, sec) => {
      // frames por cada segundo
      const frame = 1000 / 60;
      // tiempo a incrementar
      let time = 0;
      // funcion recursiva
      const lerp = () => {
        time += frame;
        // porcentaje 0.0 a 1.0
        const percent = time / sec;
        // valor que animara el elemento, se usa un min - max para sacar el valor maximo y minimo
        const value = percent * (1 - 0) + 0;
        // coloca opacidad al elemento por cada milisegundo (puede ser cualquiero otro elemento)
        el.style.opacity = `${value}`;
        // Si llega al limite sale detiene la animacion y sale de la funcion
        if (value >= 1) return;
  
        requestAnimationFrame(lerp);
      };
      lerp();
    };
  
    const getTourElements = () => {
      let elements = [...document.querySelectorAll("[data-tour]")].sort(
        (a, b) => a.dataset.tour - b.dataset.tour
      );
      tourButton.addEventListener("click", () => {
        drawTour(elements)();
        showTour(".tour-container")();
      });
    };
  
    const drawTour = elements => {
      return (i = 0) => {
        let overlay = document.createElement("div");
        let tourContainer = document.createElement("div");
        let remark = document.createElement("div");
  
        overlay.classList.add("overlay");
  
        if (i <= elements.length - 1) {
          tourContainer.innerHTML = `<div class="triangle"></div><h2  class="tour__title__paypal">${
            elements[i].dataset.title
          }</h2>
  <p class="tour__description">${elements[i].dataset.paragraph}</p>
  <a href="#" class="tour__next">Siguiente</a><a href="#" class="tour__close">Finalizar tutorial</a>`;
          tourContainer.classList.add("tour__container");
          remark.classList.add("tour__remark");
  
          elements.filter(element => {
            if (element === elements[i]) {
              element.appendChild(tourContainer);
              element.appendChild(overlay);
              animation(tourContainer, 300);
              element.prepend(remark);
              
              if (i === 0 || i === 2) {
                tourContainer.style.cssText = `top: 51px; left: -${tourContainer.getBoundingClientRect()
                  .width /
                  2 -
                  element.getBoundingClientRect().width / 2}px`;
                remark.style.cssText = "height: 54px; width: 100%; top: -100%;";
              } else if (i === 1) {
                let triangle = element.querySelector(".triangle");
                triangle.style.cssText = "left: -10px; top: 50%;";
                tourContainer.style.cssText = `top: -50%; left: calc(100% + 14px);`;
                remark.style.cssText = "height: 100%; width: 100%; top: 0;";
              } else if (i === 3) {
                tourContainer.style.cssText = `top: 51px; left: -${tourContainer.getBoundingClientRect()
                  .width /
                  2 -
                  element.getBoundingClientRect().width / 2}px`;
                remark.style.cssText = "height: 54px; width: 100%; top: -50%;";
              }
            } else {
              if (element.querySelector(".tour__container")) {
                element.removeChild(element.querySelector(".tour__container"));
                element.removeChild(element.querySelector(".tour__remark"));
              } else {
                element;
              }
            }
          });
          tourContainer
            .querySelector(".tour__next")
            .addEventListener("click", () => {
              drawTour(elements)(++i);
              overlay.remove();
            });
  
          closeTour(tourContainer)(remark)(overlay);
        } else {
          elements.filter(element => {
            if (element.querySelector(".tour__container")) {
              element.removeChild(element.querySelector(".tour__container"));
              element.removeChild(element.querySelector(".tour__remark"));
            } else {
              element;
            }
          });
  
          let endTourElement = document.createElement("div");
          endTourElement.innerHTML = `<h2  class="tour__title__paypal">
            ¡Listo!
          </h2>
    <p class="tour__description">Ahora que ya conoce las funciones más importantes de su cuenta, puede comenzar a <a class="buy-paypal blue-link" href="#">comprar</a>, <a class="send-paypal blue-link" href="#">enviar</a> y <a class="payments-paypal blue-link" href="#">solicitar pagos</a> y mucho más.</p>
    <a class="tour__close" href="#">Finalizar tutorial</a>`;
          endTourElement.classList.add("endTourElement");
          document.body.appendChild(endTourElement);
          document.body.appendChild(overlay);
          animation(endTourElement, 500);
          closeTour(endTourElement)(remark)(overlay);
        }
      };
    };
  
    const closeTour = container => {
      return remark => {
        return overlay => {
          container
            .querySelector(".tour__close")
            .addEventListener("click", () => {
              overlay.remove();
              container.remove();
              remark.remove();
              return;
            });
        };
      };
    };
  
    toggle.addEventListener("click", openMenu);
    xButton.addEventListener("click", () => {
      showTour(".tour-container")();
    });
    displayButton.addEventListener("click", () => {
      showTour(".tour-container")();
    });
    getTourElements();
  };
  
  paypalSoftware();
  