//Витягуємо дані
const articles = [];
db.collection("articles").get().then( function(res){
    res.forEach( function(dok){
        const article = dok.data();
        articles.push(article)
    })
    console.log(articles);
})

//Зберігаємо дані
function saveArticle(){
    const new_article = {
        author: document.getElementById('author').value,
        text: document.getElementById('text').value,
        title: document.getElementById('title').value
    };

    if(new_article.author.length == 0 || new_article.text.length == 0 || new_article.title.length == 0 ){ alert('Помилка'); return}

    db.collection("articles").add(new_article).then( function(){
        console.log('article save');
    })
}