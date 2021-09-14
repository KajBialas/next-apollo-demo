import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apollo-client";
import 'semantic-ui-css/semantic.min.css';

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)

export default App;