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
            let me = this;
            this.items = [];
            data.forEach(function(expense){
                item = {'name' : expense.name,'limit': expense.monthlyBudget,total: 25};
                me.items.push(item);
                axios.get(getHost() + 'walletPosition/' + expense.id)
                .then(function(res){
                    item.total = res.data.total;
                }).catch(function(err){
                    console.error(err)
                });
    
            })
        }
    }
});