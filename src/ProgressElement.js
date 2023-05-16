class ProgressElement extends HTMLElement { 
    constructor() {
        super();
        
        this.progressValue = 0;
        this._size = 0;
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.array = 0;
        this.offset = 0; 
        this.progressElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.interval = null;

        this.onAnimate = false;
        this.onHide = false;
    }

    getprogressValue() {
        return this.progressValue;
    }

    get states() {
        return this.onAnimate, this.onHide
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this.progressValue = 0;
        this._size = value;
        this.x = value + 8;
        this.y = value + 8;
        this.r = value;
        this.array = 2 * 3.14 * value;
        this.offset = this.array * ((100 - this.progressValue)/100); 
    }

    connectedCallback() {
        this.progressElement.setAttributeNS(null, 'style', 'width: ' + (this.r*2 + 16) +'; height:' + (this.r*2 + 16) +';');

        let circleBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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

        this.appendChild(this.progressElement);
    }
     
    SetProgressValue(value) {
        this.progressValue = value;
        let dashoffset = this.array * ((100 - value)/100);

        let circle = document.getElementById("ProgressCircle");
        circle.setAttributeNS(null, 'style', 'fill: none; stroke-width: 15px;stroke: #005BFF;rotate: -90deg;stroke-dasharray: ' + this.array +' ;stroke-dashoffset: ' + dashoffset + ';' );
    }

    animate(value) {
        if(value){
            this.onAnimate = true;
            this.interval = setInterval(() => {
                this.ProgressIncrement();
            }, 50);
        } else {
            this.onAnimate = false;
            clearInterval(this.interval);
        }
        return this.progressValue;
    }
 
    ProgressIncrement() {
        if(this.progressValue >= 100){
            clearInterval(this.interval);
            return this.progressValue;
        } else {
            this.progressValue = Number(this.progressValue) + 1;

            let circle = document.getElementById("ProgressCircle");
            let dashoffset = this.array * ((100 - this.progressValue)/100);

            circle.setAttributeNS(null, 'style', 'fill: none; stroke-width: 15px;stroke: #005BFF;rotate: -90deg; stroke-dasharray: ' 
                                    + this.array +' ;stroke-dashoffset: ' + dashoffset + ';' );
        }

    }

    hide(value) {
        if(value){
            this.onHide = true;
            this.progressElement.style.opacity = 0;
        } else {
            this.onHide = false;
            this.progressElement.style.opacity = 1;
        }
    }
}