const newconvert = () =>{
    location.reload()
}

class Denominator{
    constructor(useramount){
        this.useramount = useramount;
    }
    //methods
    notesCount(){
        let denominators=[1000, 500, 200, 100, 50, 20, 10, 5]
        let notes = [];
        let money = this.useramount;
        for(let i = 0; i<8; i++){
            if(money >= denominators[i]){
                let denoNum = Math.floor(money/denominators[i]);
                let product = denominators[i]*denoNum
                let noteDetails = {
                    deno:denominators[i],
                    denoNum:denoNum,
                    product:product
                }
                notes.push(JSON.stringify(noteDetails))
                money -= product;
            }
        }
        //calculate the coins
        let index= denominators.length - 1
        let coins = this.useramount%denominators[index]
        let noteDetails = {
            deno:'Coins',
            denoNum:coins,
            product:coins
        }
        notes.push(JSON.stringify(noteDetails))
        return notes
    }

    //getters
    get amtDetails(){
        return this.notesCount();
    }
}

class UI{
    constructor(useramount){
        this.useramount = useramount;
    }
    //method
    printConverted(){
        const notePrint = new Denominator(this.useramount);
        let printOut = [];
        let moneyBreakdown = notePrint.amtDetails;
        moneyBreakdown.forEach(element =>{
            printOut.push(JSON.parse(element))
        });
        return printOut
    }
    //getter
    get printable(){
        return this.printConverted();
    }
}


const convert = () =>{
    document.getElementById('result').innerHTML = '';
    let useramount = parseInt(document.getElementById('inputamt').value);
    const show = new UI(useramount);
    tabledata = show.printable;
    let table = document.getElementById('result');
    let row = table.insertRow();
    for(let i = 0; i<tabledata.length; i++){
        let cell1 = row.insertCell();
       cell1.innerHTML = tabledata[i].deno + ' X ' + tabledata[i].denoNum;
       let cell2 = row.insertCell();
       cell2.innerHTML = tabledata[i].product;
       row = table.insertRow();
    }
    row = table.insertRow();
    let cell3 = row.insertCell();
    cell3.innerHTML = 'Total'
    let cell4 = row.insertCell();
    cell4.innerHTML = useramount;
}
