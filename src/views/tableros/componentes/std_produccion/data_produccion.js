// "PRODUCTO_DESCRIPCION": "Arroz olimar ",
// "TOTAL": 49.0

const themeColors = ['#1e88e5', '#00acc1', '#fc4b6c', '#7460ee', '#1d2126']

export default {
barChart: {
    series: [{
        data: [400, 430, 448, 470, 540, 580],
        
    }],

    chartOptions: {
        chart: {
            width: '100%',
            height: 350
        },
        colors: themeColors,
        plotOptions: {
            bar: {
                horizontal: true,
            },

        },

        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Arroz tacuari 48 kg','Arroz tacuari 49 kg','Arroz 3/4', 'Arrocillo', 'Ñelen Kingdom', 'Arrocillo',
            ],
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                }
            },
        },
        yaxis: {
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                }
            },
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)'
        },
        tooltip: {
            theme: "dark"
        }
    }
},
}