var btn=document.getElementById('btn');
var bookNums=document.getElementById('book-num');
document.getElementById("form").style.display = "none";
document.getElementById("table-page").style.display = "none";

btn.addEventListener("click",function(){
    if(bookNums.value>0 )
    {
        bookNums = bookNums.value;
        document.getElementById("first-page").style.display="none";
        document.getElementById("table-page").style.display="none";
        document.getElementById("form").style.display="block";
    
    }
});
///////

var btnAdd=document.getElementById('btn-add');
var btnReset=document.getElementById('btn-reset');
var nextBook=document.getElementById('bnum');
var bookCount=0;

var bookName=document.getElementById("bookname");
var bookPrice=document.getElementById("price");
var bookDate=document.getElementById("date");
var authorName=document.getElementById("autname");
var authorEmail=document.getElementById("autemail");
var newBook;
var arrBook=[];

btnAdd.addEventListener("click",function(){
    debugger;
    // if(bookCount<bookNums)
        var bknameCheck=checkbookname(bookName.value);
        var namCheck=checkname(authorName.value);
        var priceCheck=checkprice(bookPrice.value);
        var dateCheck=checkdate(bookDate.value);
        var mailCheck=checkmail(authorEmail.value);
        if(bknameCheck && priceCheck && dateCheck && namCheck && mailCheck)
        {
        var author=new Author(authorName.value,authorEmail.value);
        newBook= new Book(author,bookName.value,bookPrice.value,bookDate.value);
        arrBook.push(newBook);
        console.log(arrBook);
        bookCount++;
        nextBook.value=bookCount+1;
        clear();
        }
   // }
    if(bookCount==bookNums){
        debugger;
        document.getElementById("first-page").style.display="none";
        document.getElementById("table-page").style.display="block";
        document.getElementById("form").style.display="none";
        var bookTable= document.getElementById("bookTable");
        var index=1;

        for(var i=0;i<bookNums;i++)
        {
        
            bookTable.innerHTML+= '<tr id="bk-'+index+'"><td>'+index+'</td><td id="bk-name-'+index+'">'+arrBook[i].name+'</td><td id="bk-price-'+index+'">'+arrBook[i].price+'</td><td id="bk-date-'+index+'">'+arrBook[i].date+'</td><td id="bk-authname-'+index+'">'+arrBook[i].author.authname+'</td><td id="bk-authmail-'+index+'">'+arrBook[i].author.email+'</td><td><input type="button" id="btn-edit" value="Edit"><input type="button" id="btn-delete" value="Delete"></td></tr>';
            index++;
        }
        

    }
   
});
bookTable.addEventListener('click',function(e){
    if(e.target && e.target.id== 'btn-edit'){
       debugger;
       var elem=e.target.parentNode.parentNode;
       var indx=parseInt(elem.id.split('-')[1]);
       var bname=document.getElementById("bk-name-"+indx);
       var bprice=document.getElementById("bk-price-"+indx);
        var bdate=document.getElementById("bk-date-"+indx);
        var authname=document.getElementById("bk-authname-"+indx);
        var authmail=document.getElementById("bk-authmail-"+indx);

 var bname_data=bname.innerHTML;
 var bprice_data=bprice.innerHTML;
 var bdate_data=bdate.innerHTML;
 var authname_data=authname.innerHTML;
 var authmail_data=authmail.innerHTML;

 e.target.parentNode.innerHTML='<td><input type="button" id="btn-save" value="save"><input type="button" id="btn-cancel" value="cancel"></td>';
 bname.innerHTML="<input type='text' id='name_text"+indx+"' value='"+bname_data+"'>";
 bprice.innerHTML="<input type='text' id='price_text"+indx+"' value='"+bprice_data+"'>";
 bdate.innerHTML="<input type='date' id='date_text"+indx+"' value='"+bdate_data+"'>";
 authname.innerHTML="<input type='text' id='authname_text"+indx+"' value='"+authname_data+"'>";
 authmail.innerHTML="<input type='email' id='authmail_text"+indx+"' value='"+authmail_data+"'>";

 document.getElementById('btn-save').addEventListener('click',function(){
    
    var name_val=document.getElementById("name_text"+indx).value;
    var price_val=document.getElementById("price_text"+indx).value;
    var date_val=document.getElementById("date_text"+indx).value;
    var autname_val=document.getElementById("authname_text"+indx).value;
    var authmail_val=document.getElementById("authmail_text"+indx).value;
    debugger;
    var bknameCheck1=checkbookname(name_val);
    var namCheck1=checkname(autname_val);
    var priceCheck1=checkprice(price_val);
    var dateCheck1=checkdate(date_val);
    var mailCheck1=checkmail(authmail_val);
    if(bknameCheck1 && priceCheck1 && dateCheck1 && namCheck1 && mailCheck1)
    {
    document.getElementById("bk-name-"+indx).innerHTML=name_val;
    document.getElementById("bk-price-"+indx).innerHTML=price_val;
    document.getElementById("bk-date-"+indx).innerHTML=date_val;
    document.getElementById("bk-authname-"+indx).innerHTML=autname_val;
    document.getElementById("bk-authmail-"+indx).innerHTML=authmail_val;

    document.getElementById('btn-save').parentNode.innerHTML='<td><input type="button" id="btn-edit" value="Edit"><input type="button" id="btn-delete" value="Delete"></td>';
   arrBook[indx-1].name=name_val;
   arrBook[indx-1].price=price_val;
   arrBook[indx-1].date=date_val;
   arrBook[indx-1].author.authname=autname_val;
   arrBook[indx-1].author.email=authmail_val;
    }
 })

 document.getElementById('btn-cancel').addEventListener('click',function(){
 document.getElementById("bk-name-"+indx).innerHTML=bname_data;
    document.getElementById("bk-price-"+indx).innerHTML=bprice_data;
    document.getElementById("bk-date-"+indx).innerHTML=bdate_data;
    document.getElementById("bk-authname-"+indx).innerHTML=authname_data;
    document.getElementById("bk-authmail-"+indx).innerHTML=authmail_data;

    document.getElementById('btn-cancel').parentNode.innerHTML='<td><input type="button" id="btn-edit" value="Edit"><input type="button" id="btn-delete" value="Delete"></td>';
   
})

    }
     else if(e.target && e.target.id=='btn-delete')
     {
        var el=e.target.parentNode.parentNode;
        var ind=parseInt(el.id.split('-')[1]);
        if(arrBook.length-1!=ind)
        {
         ind--;
        }
        el.parentNode.removeChild(el);
        arrBook.splice(ind-1, 1);

     }
 })
btnReset.addEventListener("click",function(){
    debugger;
    clear();
});
class Author{
    constructor(authname,email){
        this.authname = authname;
        this.email = email;
    }
}
class Book{
    constructor(authour,name,price,date){
        this.author=authour;
        this.name = name;
        this.price = price
        this.date = date;

    }
}
function checkbookname(bkname)
{
    if(bkname=='')
    {
        document.getElementById("bName").style.visibility="visible";
        document.getElementById("bName").innerHTML="*please enter the book name";
        return false;
    }
    else
    {
        document.getElementById("bName").style.visibility="hidden";
        return true;
    }
}
function checkname(name)
{
    if(name=='')
    {   document.getElementById("aName").style.visibility="visible";
        document.getElementById("aName").innerHTML="*please enter characters";
        return false;
    }
    else if(!isNaN(name))
    {
        document.getElementById("aName").style.visibility="visible";
        document.getElementById("aName").innerHTML="*please enter characters";
        return false;
    }
    else if((name.length<3) || (name.length>20))
    {
        document.getElementById("aName").style.visibility="visible";
        document.getElementById("aName").innerHTML="*please fill Name Between 3-20";
        return false;
    }
    else
    {
        document.getElementById("aName").style.visibility="hidden";
        return true;
    }
}
function checkprice(price)
{
    if (price=='')
    {
        document.getElementById("bPrice").style.visibility="visible";
        document.getElementById("bPrice").innerHTML="*please fill valid price";
        bookPrice.focus();
        return false;   
    }
    else if (isNaN(price))
    {
        document.getElementById("bPrice").style.visibility="visible";
        document.getElementById("bPrice").innerHTML="*please fill valid price";
        bookPrice.focus();
        return false;   
    }
    else if(parseInt(price)<=0)
    {
        document.getElementById("bPrice").style.visibility="visible";
        document.getElementById("bPrice").innerHTML="*please fill valid price";
        bookPrice.focus();
        return false;
    }
    else{
        document.getElementById("bPrice").style.visibility="hidden";
        return true;
    }
}
function checkdate(date)
{
    if (date=='')
    {
        document.getElementById("bDate").style.visibility="visible";
        document.getElementById("bDate").innerHTML="*please fill date";
        bookDate.focus();
        return false;   
    }
    else{
        document.getElementById("bDate").style.visibility="hidden";
        return true;
    }
}
function checkmail(email)
{if(email==="")
{
    document.getElementById("aEmail").style.visibility="visible";
    document.getElementById("aEmail").innerHTML="*please fill the Email";
    return false;
}
else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
{
    document.getElementById("aEmail").style.visibility="visible";
    document.getElementById("aEmail").innerHTML="*please enter valid Email";
    return false;
}
else
{
    document.getElementById("aEmail").style.visibility="hidden";

    return true;
}

}
function clear()
{
    debugger;
 bookName.value="";
 bookPrice.value="";
 bookDate.value="";
 authorName.value="";
 authorEmail.value="";
}

///////
