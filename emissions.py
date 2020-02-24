import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly.graph_objs as go
from dash.dependencies import Input, Output, State

external_stylesheets = ["https://fonts.googleapis.com/css?family=Alata&display=swap"]

# Data -> Automate afterwards

emissions=[]

personbilar = 81003
lastbilar = 11259
flygg = 8527
bussar = 29833
annat_transport = 1328
arbetsmaskiner = 19411
transport_total = personbilar + lastbilar + flygg + bussar + annat_transport + arbetsmaskiner
hus_total = 13879
industri_total = 5796
offentlig = 10185
sparat = 0
total = transport_total + hus_total + industri_total + offentlig

bensin = 223.391
diesel = 282.607
etanol = 13.670
FAME = 22.110
HVO = 122.020
biogas = 22.027
naturgas = 0
flygbransle = 32.817
el = 4.635
syndiesel = 0.092
kol = 0.098
biobensin = 2.222

liquid_fossil = 616.5188044
liquid_ickefossil = 201.4713189
elektricitet = 1300.59384
total_energi = liquid_fossil + liquid_ickefossil + elektricitet

# Sunburst for showing the total and subcategories
figure_total =go.Figure(go.Sunburst(
    labels=["total", "Sparat", "Transport", "Hus", "Industri/Jordbruk", "Offentlig","Personbilar","Lastbilar","Flygg","Bussar","Arbetsmaskiner","Annat"],
    parents=["", "total","total","total", "total","total","Transport","Transport","Transport","Transport","Transport","Transport"],
    values=[total,transport_total, hus_total, industri_total, offentlig,personbilar,lastbilar,flygg,bussar,arbetsmaskiner,annat_transport],
    branchvalues="total",
))
figure_total.update_layout(margin = dict(t=0, l=0, r=0, b=0))

trace1 = go.Bar(y=emissions, x=[bensin],name='Bensin',orientation='h')
trace2 = go.Bar(y=emissions, x=[diesel],name='Diesel',orientation='h')
trace3 = go.Bar(y=emissions, x=[etanol],name='Etanol',orientation='h')
trace4 = go.Bar(y=emissions, x=[FAME],name='FAME',orientation='h')
trace5 = go.Bar(y=emissions, x=[HVO],name='HVO',orientation='h')
trace6 = go.Bar(y=emissions, x=[biogas],name='Biogas',orientation='h')
trace7 = go.Bar(y=emissions, x=[flygbransle],name='Flygbransle',orientation='h')
trace8 = go.Bar(y=emissions, x=[el],name='El',orientation='h')
trace9 = go.Bar(y=emissions, x=[syndiesel],name='Syndiesel',orientation='h')
trace10 = go.Bar(y=emissions, x=[biobensin],name='bioBensin',orientation='h')
trace11 = go.Bar(y=emissions, x=[kol],name='Kol',orientation='h')

data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11]
layout = go.Layout(
    barmode='stack',
    xaxis=dict(tickvals=['']),
        margin={'l': 0, 'b': 0, 't': 0, 'r':0},
        width=500,
        height=100,
        hovermode='closest',
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)'
)
fig_transport = go.Figure(data=data, layout=layout)

ene1 = go.Bar(y=emissions, x=[liquid_fossil],name='Fosilbransle',orientation='h')
ene2 = go.Bar(y=emissions, x=[liquid_ickefossil],name='Fornybarbransle',orientation='h')
ene3 = go.Bar(y=emissions, x=[elektricitet],name='Elektricitet',orientation='h')
data_en = [ene1, ene2, ene3]
layout_en = go.Layout(
    barmode='stack',
    xaxis=dict(tickvals=['']),
        margin={'l': 0, 'b': 0, 't': 0, 'r':0},
        width=500,
        height=100,
        hovermode='closest',
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)'
)
fig_energy = go.Figure(data=data_en, layout=layout_en)

app = dash.Dash(__name__,external_stylesheets=external_stylesheets)
app.layout = html.Div(children=[
    html.Img(src='/assets/logo.svg', style={'width':'100px'}),
    html.H1(children='Klimatneutral 2030'),
    html.Div(
        id='general',
        children=[
            html.H2(children='Just nu: 173 476 ton CO2'),
            html.H2(children='2030: 173 476 ton CO2'),
            dcc.Graph(id="main_figure", figure=figure_total),
    ]),


    html.Div(
        id='transport',
        children=[
            html.H2(children='TRANSPORT'),
            html.P(children='Energimix'),
            dcc.Graph(id = 'energimix_transport', figure = fig_transport),
            html.Div(
                id='transport_energy',
                children=[
                    html.H3(children='ENERGI'),
                    html.P(children='Andel privata elbilar'),
                    dcc.RangeSlider(
                        id='slider_elbilar',
                        count=1,min=0, max=100, step=1, value=[4]),
                    html.P(children='Andel biobransle privatbilar'),
                    dcc.RangeSlider(count=1,min=0, max=100, step=1, value=[6])
            ]),
            html.Div(
                id='transport_behavior',
                children=[
                    html.H3(children='BETEENDE'),
                    html.P(children='Andel pendling med buss'),
                    dcc.RangeSlider(count=1,min=0, max=100, step=1, value=[4]),
                    html.P(children='Andel cyklande'),
                    dcc.RangeSlider(count=1,min=0, max=100, step=1, value=[6])
            ]),
    ]),
    html.Div(
        id='el',
        children=[
            html.H2(children='EL OCH VARME'),
            dcc.RangeSlider(count=1,min=-5, max=10, step=0.5, value=[-3, 7])
    ]),
    html.Div(
                id='energi',
                children=[
                    html.H2(children='Just nu: 2429 gWh'),
                    html.H2(children='2030:  2429 gWh +0%'),
                    dcc.Graph(figure=fig_energy),

            ]),
    html.Div(
            id='jordbruk',
            children=[
            html.H2(children='JORDBRUK'),
            dcc.RangeSlider(count=1,min=-5, max=10, step=0.5, value=[-3, 7])
    ]),
    html.Div(
            id='konsumtion',
            children=[
                html.H2(children='KONSUMTION'),
                dcc.RangeSlider(count=1,min=-5, max=10, step=0.5, value=[-3, 7])
    ]),



])

@app.callback(Output('main_figure', 'figure'),
             [Input('slider_elbilar', 'value')])
def update_figure(X):
    nybilar = globals()['personbilar']/int(X[0])
    globals()['sparat'] += globals()['personbilar']-nybilar
    globals()['personbilar'] = nybilar
    #substitute for recalculate funtion
    globals()['transport_total'] = globals()['personbilar'] + globals()['lastbilar'] + globals()['flygg'] + globals()['bussar'] + globals()['annat_transport'] + globals()['arbetsmaskiner']
    globals()['total'] = globals()['transport_total'] + globals()['hus_total'] + globals()['industri_total'] + globals()['offentlig'] + globals()['sparat']
    figure_total =go.Figure(go.Sunburst(
        labels=["total", "Sparat", "Transport", "Hus", "Industri/Jordbruk", "Offentlig","Personbilar","Lastbilar","Flygg","Bussar","Arbetsmaskiner","Annat"],
        parents=["", "total","total","total", "total","total","Transport","Transport","Transport","Transport","Transport","Transport"],
        values=[globals()['total'],globals()['transport_total'],globals()['hus_total'],globals()['industri_total'],globals()['offentlig'],globals()['personbilar'],globals()['lastbilar'],globals()['flygg'],globals()['bussar'],globals()['arbetsmaskiner'],globals()['annat_transport']],
        branchvalues="total",
    ))

    return figure_total


if __name__ == '__main__':
    app.run_server(debug=True)
