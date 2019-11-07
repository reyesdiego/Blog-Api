**Blog**

The idea is to test the coding capatibilities of programmer

The API has 2 main particularities. First it allows to decouple the http layer, for instance to migrate from express to hapi with minimun changes due the controllers and services layer.
The service layer allows a better unit testing because it does not depends on the http but only depends on bussiness rules.
