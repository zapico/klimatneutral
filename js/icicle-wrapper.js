// TODO Maybe this should be a closure instead of a class.

class IcicleWrapper {

    constructor(model, id) {

        this.model = model;

        const data = this.getData();

        this.chart = Icicle()
                .orientation('lr')
                .data(data)
                .width(300)
                .height(400)
                .color('color')
                (document.getElementById(id));

        // Always remember to bind all methods
        this.getData = this.getData.bind(this);
        this.update = this.update.bind(this);

        // Register the bound method as a listener to the model
        this.model.addListener(this.update);
    }

    getData() {
        const model = this.model;
        return {
            "name": "total c02",
            "color": "333333",
            "children": [
                {
                    "name": "transport",
                    "color": "58ad9b",
                    "children": [
                        {
                            "name": "personbilar",
                            "color": "3d7c6e",
                            "value": model.personal_car_co2
                        },
                        {
                            "name": "lastbilar",
                            "color": "458d7e",
                            "value": model.trucks_co2
                        },
                        {
                            "name": "flygg",
                            "color": "58ad9b",
                            "value": model.airplanes
                        },
                        {
                            "name": "bussar",
                            "color": "69b5a5",
                            "value": model.bus_co2
                        },
                        {
                            "name": "annat transport",
                            "color": "7abeaf",
                            "value": model.other_vehicles
                        },
                        {
                            "name": "arbetsmaskiner",
                            "color": "8bc6ba",
                            "value": model.industrial_vehicles
                        }
                    ]
                },
                {
                    "name": "bostad",
                    "color": "D25D44",
                    "value": model.housing
                },
                {
                    "name": "industri",
                    "color": "F9BD47",
                    "value": model.industry
                },
                {
                    "name": "offentlig",
                    "color": "F7972B",
                    "value": model.publicservices
                },
                {
                    "name": "sparat",
                    "color": "eeeeee",
                    "value": model.saved
                }
            ]
        }
    }

    update() {
        const data = this.getData();
        this.chart.data(data);
    }

}
