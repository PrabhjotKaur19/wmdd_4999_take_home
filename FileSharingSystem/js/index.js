    var preview = document.getElementById('preview');
    var apiBaseURL = "https://054bex8y51.execute-api.us-west-2.amazonaws.com/sls";
    var link;





    function readURL() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("file").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("preview").src = oFREvent.target.result;
        };
    }

function upload(e){
      
        var file = document.getElementById('file').files[0];
        link="//s3.amazonaws.com/imgsharingbct/"+ file.name + file.name;
        des = document.getElementById("des").value;
        var reader = new FileReader();
        reader.addEventListener('loadend', function(e){
          fetch(apiBaseURL+"/upload", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: file.name,
              type: file.type,
              link: link,
              description: des
            })
          })
          .then(function(response){
            return response.json();
          })
          .then(function(json){
            return fetch(json.uploadURL, {
              method: "PUT",
              body: new Blob([reader.result], {type: file.type})
            })
          })
          .then(function(){
            
            console.log(link);
          });
        });
        reader.readAsArrayBuffer(file);
        document.getElementById("msg").innerHTML = "Uploaded Succesfully";
      return false;
    }

    function show (){
      fetch(apiBaseURL+"/show")
  .then((resp) => resp.json())
  .then(function(data) {
    let db = data.results;
    return db.map(function(db) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = db.links;
      span.innerHTML = `${db.description}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });   
    }