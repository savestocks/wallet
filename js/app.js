var getHost = function(){
    let endpoint = '/wallet-api/v1/';
    if(location.href.indexOf('fontelira') > -1){
        return 'http://wallet.fontelira.com' + endpoint;
    }
    return 'http://localhost:8081' + endpoint;
}
new Vue({
    el: "#app",
    data: function(){
        return {
            items:[]
        }
    },

    created: function(){
        this.loadItems();
    },

    methods: {
        loadItems: function(){
        
            this.itemSelected = null;
            this.creatingItem = false;
            let me = this;
            axios.get(getHost() + 'expense')
            .then(function(res){
                me.prepareItems(res.data);

            }).catch(function(err){
                console.error(err)
            });
            
        },
        prepareItems: function(data){
            this.items = [];
            for(var i in data){
                let elem = data[i];
                this.items.push({'name':elem.name,'total':10000,'limit':elem.monthlyBudget})
            }
        }
    }
});