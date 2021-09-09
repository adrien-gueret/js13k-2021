class Item {
    constructor(type, innerHTML) {
      this.type = type;
      this.angle = r(360);

      this.nodeScale = document.createElement('div');
      this.nodeScale.className = `item-scale center ${type}`;

      this.nodeRotate = document.createElement('div');
      this.nodeRotate.className = 'item-rotate';
      this.nodeRotate.style.transform = `rotate(${this.angle + 45}deg)`;

      this.nodeTranslate = document.createElement('div');
      this.nodeTranslate.className = `item-translate ${type}`;
      this.nodeTranslate.innerHTML = innerHTML;

      this.nodeRotate.appendChild(this.nodeTranslate);
      this.nodeScale.appendChild(this.nodeRotate);
      
      document.getElementById('container').appendChild(this.nodeScale);

      this.nodeTranslate.onanimationend = () => {
        this.destroy(false);
      };

      allItems.push(this);
    }

    getCircle() {
      var {
        nodeTranslate,
        nodeScale,
      } = this;
        var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;

        var matches = getComputedStyle(nodeScale).transform.match(matrixRegex);
      
        if (matches === null) {
          return null;
        }

        var [,scale] = matches;

        var { x, y } = getCenter(nodeTranslate);
        var size = scale * getItemSize();

        return {x, y, r: size/2 };
    }

    destroy(hadCollision) {
      allItems = allItems.filter(otherItem => otherItem !== this);

      var { nodeTranslate, nodeScale } = this;

      if(hadCollision) {
        nodeTranslate.innerHTML = `<img src="${i('explosion')}" />`;
        nodeScale.style.textShadow = 'none';
        setTimeout(() => {
          this.remove();
        }, 100);
      }
    }

    remove() {
      this.nodeScale.remove();
    }
  }

  class Human extends Item {
    constructor() {
      var color = humanColors[r(humanColors.length) - 1];
      const humanSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" style="color: ${color};"><path fill="currentColor" d="M14 22c0 .553-.448 1-1 1s-1-.447-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm10 0c0 .553-.447 1-1 1-.553 0-1-.447-1-1v-8c0-.552.447-1 1-1 .553 0 1 .448 1 1v8z"/><path fill="#66757F" d="M19 19h-5l1 11h3v-7 7h3l1-11z"/><path fill="#546170" d="M18 23c-.552 0-1 7-1 7 0 .553.448 0 1 0 .553 0 1 .553 1 0 0 0-.447-7-1-7z"/><path fill="#292F33" d="M22 11h-8c-1.104 0-2 .896-2 2v8h2v1h2l2-1 2 1h2v-1h2v-8c0-1.104-.896-2-2-2zm-5.36 18.479c1.105 0 1.346.159 1.359.521.052 1.375-1.786 3.479-3.141 2.979-.86-.317-.422-1.901.141-2.979.23-.441.962-.521 1.641-.521z"/><path fill="#292F33" d="M19.36 29.479c-1.105 0-1.346.159-1.359.521-.051 1.375 1.787 3.479 3.141 2.979.86-.317.422-1.901-.141-2.979-.23-.441-.961-.521-1.641-.521z"/><path fill="currentColor" d="M16.799 10h2.402v1.592h-2.402zm-1.495-3.181c0 .592-.3 1.071-.67 1.071-.37 0-.67-.48-.67-1.071 0-.592.3-1.071.67-1.071.37-.001.67.479.67 1.071zm6.696 0c0 .592-.3 1.071-.67 1.071-.37 0-.67-.48-.67-1.071 0-.592.3-1.071.67-1.071.37-.001.67.479.67 1.071z"/><path fill="currentColor" d="M18 10.906c-1.923 0-3.482-1.851-3.482-4.135S16.077 2.636 18 2.636s3.482 1.851 3.482 4.135-1.559 4.135-3.482 4.135"/><path fill="#C1694F" d="M19.305 9.096c-.015-.025-.043-.041-.073-.041h-2.453c-.03 0-.058.015-.073.041-.015.025-.017.057-.003.084.015.029.372.704 1.303.704.931 0 1.288-.676 1.303-.704.013-.026.011-.058-.004-.084zm-1.297-1.16c-.269 0-.478-.048-.646-.122.055.198.21.474.646.474.436 0 .59-.276.646-.474-.168.074-.377.122-.646.122z"/><path fill="#292F33" d="M14.827 6.396c.06-.296.148-.546.246-.771h-.777c.121.874.465 1.095.531.771zm6.346-.125c.239.47.475.152.55-.771h-.942l.392.771z"/><path fill="#546170" d="M19.8 13.2l1.276-1.2-.49-1H19.8z"/><path fill="#66757F" d="M17.997 18l3.099-5.045-1.271-1.361z"/><path fill="#546170" d="M16.2 13.2L14.924 12l.49-1h.786z"/><path fill="#66757F" d="M18 18l-3.099-5.045 1.271-1.361z"/><path fill="#E1E8ED" d="M18 18l-2-7 2 1 2-1z"/><path fill="#55ACEE" d="M19 12l-1-.417L17 12l.878.878-.793 1.918L18 18l.915-3.204-.793-1.918z"/><path fill="#F5F8FA" d="M16.562 10.562L18 11.583l-.938.995L16 11zm2.876 0L18 11.583l.938.995L20 11z"/><path fill="#292F33" d="M20.324 3.977c.612-.166 1.091-.411 1.091-.411s-.141-.578-.283-.95c-.442-1.154-1.175-1.729-1.849-1.558-1.019.259-1.496.11-2.712-.034-1.215-.144-1.773 1.682-1.968 2.542 0 0 .322.274.902.403.022.005.05.008.073.013-2.094.094-2.787.351-2.787.852 0 .66 2.336 1.333 5.219 1.333 2.882 0 5.219-.673 5.219-1.333-.002-.511-.723-.767-2.905-.857z"/><path fill="#66757F" d="M21.583 4.225c-.012-.069-.027-.145-.043-.22-.048-.225-.126-.439-.126-.439s-1.101.429-3.406.429-3.406-.429-3.406-.429-.078.214-.126.439c-.016.076-.031.152-.043.22-.048.273.081.461.966.649.6.127 1.582.241 2.608.22 1.026.021 2.009-.093 2.608-.22.888-.188 1.017-.376.968-.649z"/><path fill="#292F33" d="M21.492 5.897l-.958.316c-.337-.047-1.038-.066-1.779.015-.197.022-.272.078-.739.078-.466 0-.542-.056-.739-.078-.741-.081-1.442-.062-1.779-.015l-.958-.316c-.093-.033-.191.019-.221.111s.02.19.111.221l.894.295c.066.051.208.148.242.248.039.116.117.861.35 1.055.241.2 1.148.125 1.322.039.389-.194.437-.82.505-1.094.039-.155.272-.155.272-.155s.233 0 .272.155c.069.274.117.902.505 1.096.174.087 1.081.161 1.322-.039.233-.194.311-.941.35-1.057.033-.1.175-.196.241-.247l.895-.295c.092-.03.142-.129.111-.221-.029-.093-.132-.144-.219-.112z"/></svg>`;
      super('human', humanSVG);
    }

    destroy(hadCollision) {
      super.destroy(hadCollision);

      var { nodeTranslate, nodeScale, angle } = this;

      nodeScale.classList.remove('human');
      nodeTranslate.classList.remove('human');

      if (hadCollision) { 
        var { x, y } = this.getCircle();

        new Score(x, y, 10);

        if(++totalHumansKilled === totalHumansToKillBeforeNextLevel) {
          new Rocket();
          showNextDialog();
        }
      } else {
        nodeTranslate.innerHTML = `
          <div class="money">
            <div class="transform">
                <img style="transform: rotate(-${angle + 45}deg);" src="${i('money')}" />
            </div>
          </div>`;
      }
    }
  }

  class Rocket extends Item {
    constructor() {
      super('rocket', `<img class="rocket-image" src="${i('rocket')}" />`);
    }

    destroy(hadCollision) {
      super.destroy(hadCollision);

      var { nodeTranslate } = this;

      if(hadCollision) {
        totaLives--;
        document.body.style.removeProperty('animation');
        window.requestAnimationFrame(() => document.body.style.animation = 'shake 0.8s ease-in-out both');
      } else {
        nodeTranslate.style.animationName = 'fly-away';

        nodeTranslate.onanimationend = () => {
          this.remove();
        };
      }
    }
  }
