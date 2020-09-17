var getHost = function(){
    let endpoint = '/wallet-api/v1/';
    if(true || location.href.indexOf('fontelira') > -1){
        return 'http://wallet.fontelira.com' + endpoint;
    }
    return 'http://localhost:8081' + endpoint;
}
var months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
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
    computed: {
        currentMonth: function(){
            let d = new Date();
            let y = d.getFullYear();
            let m = d.getMonth();
            return months[m] + "/" + y
        }
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
                axios.get(getHost() + 'walletPosition/' + expense.id)
                .then(function(res){
                    let item = {'name' : expense.name,'limit': expense.monthlyBudget,total: res.data.total};
                    me.items.push(item);
                }).catch(function(err){
                    console.error(err)
                });
    
            })
        }
    }
});