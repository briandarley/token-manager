<template>
  <div class="card process-message" :class="cardLevel">
    <div class="card-body d-flex align-items-center" :class="bgLevel">
      <div class="card-icon">
        <div class="icon-container">
          <template v-if="level == 'info'">
            <i class="bi bi-info"></i>
          </template>
          <template v-if="level == 'warn'">
            <i class="bi bi-exclamation-lg"></i>
          </template>
          <template v-if="level == 'danger'">
            <i class="fa fa-minus"></i>
          </template>
          <div id="shape" ref="shape"></div>
        </div>
      </div>
      <div class="card-message align-self-center">
        <slot name="message"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

.process-message {
  .icon-container {
    margin: auto;
    width: 100px;
    height: 100px;
  }
  i {
    position: absolute;
    font-size: 5em;
    margin-left: 12px;
    margin-top: -12px;
  }
  i.fa-minus {
    font-size: 3.5em;
    margin-left: 28px;
    margin-top: 20px;

  }
  svg {
    circle {
      stroke-width: 1;
      opacity: 0.4;
    }
  }

  .card-message {
    padding: 5px 20px;
    font-size: 1.1em;
    font-weight: 400;
  }
}

.card-info {
  i {
    color: $carolina-blue;
  }

  svg {
    circle {
      fill: lighten($info, 30%);
    }
  }
  .card-message {
    color: $carolina-blue;
  }
}
.card-warning {
  i {
    color: darken($yellow, 20%);
  }
  .triangle {
    stroke: $yellow;
    fill: $yellow;
    stroke-width: 30;
    opacity: 0.4;
    transform: rotate(-90deg);
  }
}
.card-danger {
  i {
    color: darken($red, 20%);
  }
  .stop {
    stroke: $red;
    fill: $red;
    stroke-width: 30;
    opacity: 0.4;
    transform: rotate(22.5deg);
  }
}
@media only screen and (max-width: 768px) {
  .icon-container {
    display: none;
  }
}
</style>
<script>
export default {
  name: "info-card",
  props: ["level"],
  //   setup() {},
  //   created() {},
  //   mounted() {},
  data() {
    return {
      infoLevel: this.level,
    };
  },
  mounted() {
    if (this.level == "danger") {
      this.createStop();
    }
    if (this.level == "warn") {
      this.createTriangle();
    }
    if (this.level == "info") {
      this.createCircle();
    }
  },
  methods: {
    //shapes inspired by 
    //https://tympanus.net/codrops/2021/06/04/trigonometry-in-css-and-javascript-beyond-triangles/
    createStop() {
      let points = this.plotPoints("shape", 100, 8);

      let element = this.$refs.shape;

      var shape = `<svg viewBox="-80 -120 250 250" class="stop">
            <polygon
                class="astop"
                points="${points}"
              />
        </svg>`;

      element.innerHTML = shape;
    },
    createTriangle() {
      let points = this.plotPoints("shape", 100, 3);

      let element = this.$refs.shape;

      var shape = `<svg viewBox="-55 -130 220 250" class="triangle">
            <polygon
                stroke-linejoin="round"
                points="${points}"
              />
        </svg>`;

      element.innerHTML = shape;
    },
    createCircle() {
      let element = this.$refs.shape;

      var shape = `<svg viewBox="0 5 120 120" class="circle">
              <circle cx="60" cy="65" r="55" />
            </svg>`;

      element.innerHTML = shape;
    },
    plotPoints(selector, radius, numberOfPoints) {
      let element = this.$refs[selector];

      // step used to place each point at equal distances
      const angleStep = (Math.PI * 2) / numberOfPoints;

      // x and y position to center the path
      const xPosition = element.clientWidth / 2;
      const yPosition = element.clientHeight / 2;

      // keep track of our points
      const points = [];

      for (let i = 1; i <= numberOfPoints; i++) {
        // x & y coordinates of the current point
        const x = xPosition + Math.cos(i * angleStep) * radius;
        const y = yPosition + Math.sin(i * angleStep) * radius;

        // push the point to the points array
        points.push({ x, y });
      }

      let shape = points
        .map(({ x, y }) => {
          return `${x} ${y}`;
        })
        .join(",");

      return shape;
    },
  },

  computed: {
    cardLevel() {
      if (this.infoLevel == "info") {
        return "card-info";
      }
      if (this.infoLevel == "warn") {
        return "card-warning";
      }
      if (this.infoLevel == "danger") {
        return "card-danger";
      }
      return "";
    },
    bgLevel() {
      if (this.infoLevel == "info") {
        return "bg-light-blue";
      }
      if (this.infoLevel == "warn") {
        return "bg-light-yellow";
      }
      if (this.infoLevel == "danger") {
        return "bg-light-red";
      }
      return "";
    },
  },
};
</script>
