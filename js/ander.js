Vue.component('ander-component', {
    name: 'ander-component',
    template: "#anderCmp",
	// template: `
	
    // `,
    created: function(){
        console.warn('component created')
    },
    props: {
        name : { default:"Invalid"},
        total: {default : 0},
        limit: {default: 0},
    },

    data: function(){
        return {
            percent: 0,
            countPercent: 0,
            interval: null
        }
    },
    
    created: function(){
        this.interval = setInterval(this.sumPercent,100);

    },
    computed: {
        consumed: function(){
            return this.percent + "%";
        },
        styles: function(){
            let height;
            let top;
            if(this.percent >= 100){
                height = 100;
                top = 0;
            }else {
                top = 100 - this.percent;
                height = this.percent;
            }

            return {
                'top': top + '%',
                'height': height + '%', 
                'background-color': this.color(),

            }
        },
        styleImage: function(){
            let url;
            switch (true) {
                case (this.percent <= 10):
                    url = 'url("./img/0-10.png")';
                    break
                case (this.percent <= 30):
                    url = 'url("./img/10-30.png")';
                    break
                case (this.percent <= 50):
                    url = 'url("./img/30-50.png")';
                    break
                case (this.percent <= 70):
                    url = 'url("./img/50-70.png")';
                    break
                case (this.percent <= 90):
                    url = 'url("./img/70-90.png")';
                    break
            
                default:
                    url = 'url("./img/90-100.png")';

            }  
            return {'background-image': url};            
        }
    },


	methods: {
        color: function(){
            switch (true) {
                case (this.percent < 33):
                    return '#55AA5588';
                case (this.percent < 66):
                    return '#AAAA5588';
                default:
                    return '#AA555588';
            }            
        },
        sumPercent: function(){
            let max = Math.floor(this.total / this.limit * 100);
            if(this.countPercent >= max ){
                clearInterval(this.interval);
            }else{
                this.countPercent = this.countPercent + 7;
                this.percent = this.countPercent;
            }

        }
	}
});