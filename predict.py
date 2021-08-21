import pandas as pd
import pickle
import warnings 
from warnings import filterwarnings
filterwarnings('ignore')
class FlightPricePrediction:
    def __init__(self, Airline, Date_of_Journey, Source, Destination, Total_Stops, Route, Dep_Time, Arr_Time):
        self.test_data = pd.DataFrame()
        self.Airline = Airline
        self.Date_of_Journey = Date_of_Journey
        self.Source = Source
        self.Destination = Destination
        self.Total_Stops = Total_Stops
        self.Route = Route
        self.Dep_Time = Dep_Time
        self.Arr_Time = Arr_Time
    
    def predictPrice(self):
        mp_stop = {'non-stop': 0, '1 stop': 1, '2 stops': 2, '3 stops': 3}
        self.test_data['Total_Stops'] = [mp_stop[self.Total_Stops]]
        
        self.test_data['Date_of_Journey_Day'] = [pd.to_datetime(self.Date_of_Journey).day]
        self.test_data['Date_of_Journey_Month'] = [pd.to_datetime(self.Date_of_Journey).month]
        
        self.test_data['Dep_Time_Hour'] = [pd.to_datetime(self.Dep_Time).hour]
        self.test_data['Dep_Time_Minute'] = [pd.to_datetime(self.Dep_Time).minute]
        
        self.test_data['Arrival_Time_Hour'] = [pd.to_datetime(self.Arr_Time).hour]
        self.test_data['Arrival_Time_Minute'] = [pd.to_datetime(self.Arr_Time).minute]
        
        Dept_Duration = int(self.Dep_Time.split(':')[0])*60 + int(self.Dep_Time.split(':')[1])
        Arr_Duration = int(self.Arr_Time.split(':')[0])*60 + int(self.Arr_Time.split(':')[1])
        if Dept_Duration<=Arr_Duration:
            rem = Arr_Duration - Dept_Duration
        else:
            rem = 1440-(Dept_Duration - Arr_Duration)
        self.test_data['Duration_Hour'] = [(rem//60)]
        self.test_data['Duration_Minute'] = [(rem%60)]
        
        for name in ['Air Asia', 'Air India', 'GoAir', 'IndiGo', 'Jet Airways',
               'Jet Airways Business', 'Multiple carriers',
               'Multiple carriers Premium economy', 'SpiceJet', 'Trujet', 'Vistara',
               'Vistara Premium economy']:
            if name==self.Airline:
                self.test_data[name] = 1
            else:
                self.test_data[name] = 0
        
        label = {
            'label_route1' : {
                              'DEL': '3', 
                              'CCU': '2', 
                              'BLR': '0', 
                              'BOM': '1', 
                              'MAA': '4',
                              'XYZ': '5'
                            },
            'label_route2' : {
                              'BOM': '7',
                              'DEL': '14',
                              'BLR': '6',
                              'HYD': '20',
                              'CCU': '9',
                              'AMD': '0',
                              'JAI': '28',
                              'MAA': '33',
                              'COK': '11',
                              'BBI': '2',
                              'IDR': '21',
                              'GAU': '15',
                              'NAG': '34',
                              'GOI': '16',
                              'PNQ': '37',
                              'LKO': '32',
                              'BHO': '4',
                              'IXR': '25',
                              'JDH': '29',
                              'ATQ': '1',
                              'BDQ': '3',
                              'IXB': '23',
                              'RPR': '41',
                              'UDR': '38',
                              'TRV': '40',
                              'VGA': '42',
                              'IXC': '24',
                              'IXU': '26',
                              'VNS': '43',
                              'PAT': '31',
                              'KNU': '36',
                              'GWL': '17',
                              'HBX': '18',
                              'DED': '12',
                              'STV': '39',
                              'VTZ': '27',
                              'IXZ': '44',
                              'JLR': '22',
                              'IXA': '30',
                              'NDC': '35',
                              'XYZ': '45',
                            },
            'label_route3' : {
                              'None': '29',
                              'COK': '7',
                              'BLR': '3',
                              'BOM': '4',
                              'DEL': '9',
                              'MAA': '22',
                              'HYD': '14',
                              'AMD': '0',
                              'NAG': '23',
                              'GOI': '11',
                              'IDR': '15',
                              'BBI': '1',
                              'VGA': '27',
                              'BHO': '10',
                              'GAU': '2',
                              'PNQ': '24',
                              'HBX': '12',
                              'JDH': '21',
                              'IMF': '16',
                              'ISK': '17',
                              'VTZ': '28',
                              'UDR': '26',
                              'IXR': '19',
                              'TRV': '25',
                              'IXC': '18',
                              'JAI': '5',
                              'CCU': '20',
                              'XYZ': '30'
                            },
            'label_route4' : {
                              'None': '13',
                              'COK': '5',
                              'BLR': '3',
                              'DEL': '7',
                              'HYD': '10',
                              'BOM': '4',
                              'TRV': '12',
                              'GWL': '8',
                              'BBI': '11',
                              'NAG': '2',
                              'BHO': '1',
                              'AMD': '0',
                              'XYZ': '14'
                            },
            'label_route5' : {
                              'None': '5',
                              'COK': '1',
                              'BLR': '0',
                              'DEL': '2',
                              'HYD': '3',
                              'VGA': '4',
                              'XYZ': '6'
                            }
            }
        route_array = self.Route.split('->')
        for x in range(5):
            if x<len(route_array):
                if route_array[x] in label[f"label_route{x+1}"].keys():
                    self.test_data[f"Route{x+1}"] = [int(label[f"label_route{x+1}"][route_array[x]])]
                else:
                    self.test_data[f"Route{x+1}"] = [int(label[f"label_route{x+1}"]['XYZ'])]
            else:
                self.test_data[f"Route{x+1}"] = [int(label[f"label_route{x+1}"]['None'])]

        with open('flight.pkl', 'rb') as fl:
            model = pickle.load(fl)
        return round(model.predict(self.test_data)[0], 2)
        

