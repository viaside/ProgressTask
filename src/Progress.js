class Progress {
    constructor(size){
        this.progressValue = 0;
        this.x = size + 8;
        this.y = size + 8;
        this.r = size? size : 80;
        this.array = 2 * 3.14 * this.r;
        this.offset = this.array * ((100 - this.progressValue)/100); 
        this.progressElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.interval = null;
    }

    start(element){
        this.progressElement.setAttributeNS(null, 'style', 'width: ' + (this.r*2 + 16) +'; height:' + (this.r*2 + 16) +';');

        var circleBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleBg.setAttributeNS(null, 'cx', this.x);
        circleBg.setAttributeNS(null, 'cy', this.y);
        circleBg.setAttributeNS(null, 'r',  this.r);
        circleBg.setAttributeNS(null, 'style', 'fill: none; stroke-width: 15px;stroke: #e1e7ef;' );

        this.progressElement.appendChild(circleBg);

        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, 'id', "ProgressCircle");
        circle.setAttributeNS(null, 'cx', - this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'r',  this.r);
        circle.setAttributeNS(null, 'style', 'fill: none; stroke-width: 15px;stroke: #005BFF;rotate: -90deg;stroke-dasharray: ' + this.array +' ;stroke-dashoffset: ' + this.offset + ';' );

        this.progressElement.appendChild(circle);

        element.appendChild(this.progressElement);
    }
    
    GetProgressValue() {
        return this._progressValue;
    }

    SetProgressValue(value) {
        this.progressValue = value;
        let dashoffset = this.array * ((100 - value)/100);

        let circle = document.getElementById("ProgressCircle");
        circle.setAttributeNS(null, 'style', 'fill: none; stroke-width: 15px;stroke: #005BFF;rotate: -90deg;stroke-dasharray: ' + this.array +' ;stroke-dashoffset: ' + dashoffset + ';' );
    }

    animate(value) {
        if(value){
            this.interval = setInterval(() => {
                this.ProgressIncrement(this.interval);
            }, 50);
        } else {
            clearInterval(this.interval);
        }
    }
 
    ProgressIncrement(interval) {
        if(this.progressValue >= 100){
            clearInterval(this.interval);
            document.getElementById("Animate").checked = false;
        } else {
            this.progressValue = Number(this.progressValue) + 1;
            document.getElementById("Value").value = this.progressValue;

            let circle = document.getElementById("ProgressCircle");
            let dashoffset = this.array * ((100 - this.progressValue)/100);

            circle.setAttributeNS(null, 'style', 'fill: none; stroke-width: 15px;stroke: #005BFF;rotate: -90deg; stroke-dasharray: ' + this.array +' ;stroke-dashoffset: ' + dashoffset + ';' );
        }
    }

    hide(value) {
        if(value){
            this.progressElement.style.opacity = 0;
        } else {
            this.progressElement.style.opacity = 1;
        }
    }
}
