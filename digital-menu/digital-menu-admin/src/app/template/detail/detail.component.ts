import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplatesService } from 'src/generated';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  templateDtoJson: string;
  file: File;

  constructor(private templatesService: TemplatesService) {}

  ngOnInit(): void {
    this.templateDtoJson = `{
      "name": "Demo Template",
      "description": "Demo Template",
      "storeId": 1,
      "createdTime": "2020-10-07T12:13:43.373",
      "uilink": null,
      "boxes": [
        {
          "boxType": {
            "id": 1,
            "name": "product",
            "description": "contain product list"
          },
          "location": 1,
          "src": "",
          "headerTitle": null,
          "footerTitle": null,
          "headerSrc": "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "footerSrc": null,
          "productLists": [
            {
              "id": 1,
              "title": "Todays Specials",
              "boxId": 1,
              "maxSize": 5,
              "location": 1,
              "products": [
                {
                  "productId": 40,
                  "location": 1
                },
                {
                  "id": 22,
                  "title": "The Italian",
                  "description": "Salami, Sliced Parmigiano Reggiano",
                  "price": 6.99,
                  "src": null,
                  "location": 2
                },
                {
                  "id": 23,
                  "title": "The Favorite",
                  "description": "Ham, Provoline, Roma Tomatoes",
                  "price": 6.99,
                  "src": null,
                  "location": 3
                },
                {
                  "id": 24,
                  "title": "Big Bird",
                  "description": "Turkey, Swiss, Cheedar, Avocado",
                  "price": 5.99,
                  "src": null,
                  "location": 4
                },
                {
                  "id": 25,
                  "title": "Albacore Tuna",
                  "description": "Albacore Tuna, Swiss, Romaine",
                  "price": 7.99,
                  "src": null,
                  "location": 5
                }
              ]
            }
          ]
        },
        {
          "id": 2,
          "templateId": 1,
          "boxType": {
            "id": 1,
            "name": "product",
            "description": "contain product list"
          },
          "location": 2,
          "src": "",
          "headerTitle": "",
          "footerTitle": "",
          "headerSrc": "",
          "footerSrc": "",
          "productLists": [
            {
              "id": 5,
              "title": "Made Fress",
              "boxId": 2,
              "maxSize": 5,
              "location": 1,
              "products": [
                {
                  "id": 26,
                  "title": "BBQ Special",
                  "description": "BBQ Special",
                  "price": 5.49,
                  "src": null,
                  "location": 1
                },
                {
                  "id": 27,
                  "title": "The Big Roy",
                  "description": "Eggs, Prosclutta, Melted Swiss",
                  "price": 6.99,
                  "src": null,
                  "location": 2
                },
                {
                  "id": 28,
                  "title": "The Hawaiian",
                  "description": "Goat Cheese, Turkey, Spinach",
                  "price": 5.99,
                  "src": null,
                  "location": 3
                },
                {
                  "id": 29,
                  "title": "The Don",
                  "description": "Albacore Tuna, Melted Swiss Cheese",
                  "price": 5.99,
                  "src": null,
                  "location": 4
                },
                {
                  "id": 30,
                  "title": "Meatball Marianara",
                  "description": "Meatball, Tomato Sauce, Mazzaralla",
                  "price": 6.99,
                  "src": null,
                  "location": 5
                }
              ]
            },
            {
              "id": 6,
              "title": "Quick Pick",
              "boxId": 2,
              "maxSize": 4,
              "location": 2,
              "products": [
                {
                  "id": 31,
                  "title": "Chicken Wrap",
                  "description": "",
                  "price": 4.99,
                  "src": null,
                  "location": 1
                },
                {
                  "id": 32,
                  "title": "The Sarah",
                  "description": "",
                  "price": 5.99,
                  "src": null,
                  "location": 2
                },
                {
                  "id": 33,
                  "title": "Scotty Rock",
                  "description": "",
                  "price": 5.99,
                  "src": null,
                  "location": 3
                },
                {
                  "id": 34,
                  "title": "The Unusual",
                  "description": "",
                  "price": 6.99,
                  "src": null,
                  "location": 4
                }
              ]
            }
          ]
        },
        {
          "id": 3,
          "templateId": 1,
          "boxType": {
            "id": 1,
            "name": "product",
            "description": "contain product list"
          },
          "location": 3,
          "src": "",
          "headerTitle": "",
          "footerTitle": "",
          "headerSrc": "",
          "footerSrc": "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "productLists": [
            {
              "id": 7,
              "title": "Healthy Eating",
              "boxId": 3,
              "maxSize": 5,
              "location": 1,
              "products": [
                {
                  "id": 35,
                  "title": "London Sp.",
                  "description": "Iceberg, Radatone pasta",
                  "price": 6.99,
                  "src": null,
                  "location": 1
                },
                {
                  "id": 36,
                  "title": "Veggie Delight",
                  "description": "Albacore Tuna, Melted Swiss Cheese",
                  "price": 5.99,
                  "src": null,
                  "location": 2
                },
                {
                  "id": 37,
                  "title": "The 510",
                  "description": "With whipped cream",
                  "price": 6.49,
                  "src": null,
                  "location": 3
                },
                {
                  "id": 38,
                  "title": "Taco Wrap",
                  "description": "Albacone Tuna, Swiss, Rotaine",
                  "price": 6.99,
                  "src": null,
                  "location": 4
                },
                {
                  "id": 39,
                  "title": "The Greak",
                  "description": "Albacone Tuna, Melted Swiss Cheese",
                  "price": 6.99,
                  "src": null,
                  "location": 5
                }
              ]
            }
          ]
        }
      ]
    }`;
  }

  onFileChange(file: File) {
    console.log(file);
    if (file) this.file = file;
  }

  create() {
    this.templatesService
      .apiTemplatesPost(this.file, this.templateDtoJson)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
