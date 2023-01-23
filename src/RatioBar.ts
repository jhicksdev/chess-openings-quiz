class RatioBar {
  private static readonly instance = new RatioBar();
  private readonly element: HTMLDivElement | null = document.querySelector(".ratio-bar");
  private readonly progress: HTMLDivElement | null = document.querySelector(".ratio-bar__progress");
  private readonly text: HTMLDivElement | null = document.querySelector(".ratio-bar__text");

  private constructor() {
    const playCount = this.getPlayCount();
    const correctCount = this.getCorrectCount();
    const incorrectCount = this.getIncorrectCount();

    sessionStorage.setItem("playCount", playCount ? playCount : "0");
    sessionStorage.setItem("correctCount", correctCount ? correctCount : "0");
    sessionStorage.setItem("incorrectCount", incorrectCount ? incorrectCount : "0");

    this.update();
  }

  static getInstance = () => RatioBar.instance;

  private update = () => {
    const playCount = this.getPlayCount();
    const correctCount = this.getCorrectCount();
    const incorrectCount = this.getIncorrectCount();

    if (playCount && correctCount && incorrectCount) {
      if (this.progress) this.progress.style.width = `${(parseInt(correctCount) / parseInt(playCount)) * 100}%`;
      if (this.text) this.text.textContent = `${parseInt(correctCount)}/${parseInt(playCount)}`;

      if (!(parseInt(correctCount) === 0 && parseInt(incorrectCount) === 0)) {
        if (this.element) this.element.style.backgroundColor = "#b50000";
        if (this.progress) this.progress.style.backgroundColor = "green";
        if (this.text) this.text.style.color = "white";
      }
    }
  };

  private getPlayCount = () => sessionStorage.getItem("playCount");
  private incrementPlayCount = () => {
    const playCount = this.getPlayCount();
    if (playCount) sessionStorage.setItem("playCount", (parseInt(playCount) + 1).toString());
    this.update();
  };

  private getCorrectCount = () => sessionStorage.getItem("correctCount");
  incrementCorrectCount = () => {
    const correctCount = this.getCorrectCount();
    if (correctCount) sessionStorage.setItem("correctCount", (parseInt(correctCount) + 1).toString());
    this.incrementPlayCount();
  };

  private getIncorrectCount = () => sessionStorage.getItem("incorrectCount");
  incrementIncorrectCount = () => {
    const incorrectCount = this.getIncorrectCount();
    if (incorrectCount) sessionStorage.setItem("incorrectCount", (parseInt(incorrectCount) + 1).toString());
    this.incrementPlayCount();
  };
}

export { RatioBar };
