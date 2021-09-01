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
      
      c.appendChild(this.nodeScale);

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
        var size = scale * itemSize;

        return {x, y, r: size/2 };
    }

    destroy(hadCollision) {
      allItems = allItems.filter(otherItem => otherItem !== this);

      var { nodeTranslate, nodeScale } = this;

      if(hadCollision) {
        nodeTranslate.innerHTML = '💥';
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
      var emojiCode = humanEmojiCode + humanColors[r(humanColors.length) - 1];
      super('human', emojiCode);
    }

    destroy(hadCollision) {
      super.destroy(hadCollision);

      var { nodeTranslate, angle } = this;

      if (hadCollision) { 
        var { x, y } = this.getCircle();

        new Score(x, y, 10);

      } else {
        nodeTranslate.innerHTML = `
          <div class="money">
            <div class="transform">
                <img style="transform: rotate(-${angle + 45}deg);" src="${i('money',1)}" />
            </div>
          </div>`;
      }
    }
  }

  class Rocket extends Item {
    constructor() {
      super('rocket', `<img class="rocket-image" src="${i('rocket',1)}" />`);
    }

    destroy(hadCollision) {
      super.destroy(hadCollision);

      var { nodeTranslate } = this;

      if(hadCollision) {
        totaLives--;
      } else {
        nodeTranslate.style.animationName = 'fly-away';

        nodeTranslate.onanimationend = () => {
          this.remove();
        };
      }
    }
  }
