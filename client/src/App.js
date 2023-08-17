import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home";
import Project from "./pages/Project"
import { ApolloProvider, ApolloClient, InMemoryCache, from } from "@apollo/client"
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing,incoming){
            return incoming
          }
        },
        projects:{
          merge(existing,incoming){
            return incoming
          }
        }
      }
    }
  }
})

console.log(cache);
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache
  // cache: new InMemoryCache(),
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projects/:id" element={<Project/>} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </Router>
      
    </ApolloProvider>

    </>

  );
}

export default App;
