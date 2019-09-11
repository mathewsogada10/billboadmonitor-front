import React, { Component } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "react-bootstrap";

class ImagesDisplay extends Component {
  state = { images: [], base64Img: [] };

  componentWillMount() {
    this.passImages();
  }

  passImages = () => {
    let imgs = this.props.location.state.images;
    var base64 = [];
    //const input = document.getElementById("imageDiv");
    html2canvas(document.body).then(canvas => {
      //   imgs.forEach(image => {
      //     let imgData = canvas.toDataURL(image.fileContent);
      //     base64.push(imgData);
      //   });
      for (var j = 0; j < imgs.length; j++) {
        let imgData = canvas.toDataURL(imgs[j].fileContent + "jpeg");
        base64.push(imgData);
      }
    });
    this.setState({ images: imgs, base64Img: base64 });
  };

  printDocument = () => {
    let doc = new jsPDF();
    let images = this.state.base64Img;
    // this.state.base64Img.forEach(img => {
    //   pdf.setFontSize(40);
    //   pdf.addImage(img, "jpg", 15, 40, 180, 180);
    //   pdf.save("download.pdf");
    // });
    console.log("size of images:" + images.length);
    for (var j = 0; j < images.length; j++) {
      console.log("loop test:" + images[j]);
      doc.addImage(images[j], "JPEG", j * 100, 10, 70, 15);
    }
    doc.setFontSize(20);
    doc.text(10, 20, "This is a test to see if images will show");
    doc.save("board_images.pdf");
  };

  savePDF = () => {
    var imgData;
    var canvas;
    var context;
    let images = this.state.images;
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = 1100;
    canvas.height = 1700;

    //add the images
    context = canvas.getContext("2d");

    for (var j = 0; j < images.length; j++) {
      console.log(" Image name:" + images[j].fileContent);
      var img = document.createElement("img");
      img.setAttribute("src", images[j].fileContent);
      img.setAttribute("crossorigin", "anonymous");
      img.crossOrigin = "Anonymous";
      img.header = "Access-Control-Allow-Origin: *";
      context.drawImage(img, 100, 30, 200, 137);
    }
    //now grab the one image data for jspdf
    imgData = canvas.toDataURL("image/jpeg");

    //and lose the canvas when you're done
    document.body.removeChild(canvas);

    var doc = new jsPDF();
    doc.addImage(imgData, "JPEG", 0, 0, 209, 297);
    doc.save("test2.pdf");
  };

  render() {
    var { images } = this.state;
    return (
      <div>
        <div>
          <Button
            style={{ float: "left" }}
            variant="success"
            onClick={() => this.savePDF()}
          >
            Download PDF
          </Button>
        </div>
        <div id="imageDiv">
          {images.map(image => (
            <div key={image.id}>
              <div>
                {" "}
                {image.description} {" - "} {image.board}{" "}
              </div>
              <img
                alt={image.description}
                src={image.fileContent}
                style={{ width: "400px", height: "300px" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImagesDisplay;
