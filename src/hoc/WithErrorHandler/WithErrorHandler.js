import React from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Auxx"
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
   return props => {
       const [error, clearError] = useHttpErrorHandler(axios);
   //     const [error, setError] = useState(null);
   //
   //          const reqInterceptor = axios.interceptors.request.use(req => {
   //              setError(null);
   //              return req;
   //          });
   //          const resInterceptor = axios.interceptors.response.use(
   //              res => res,
   //                  err => {
   //              setError(err);
   //          });
   //
   //
   //      useEffect(() => {
   //          return () => {
   //              axios.interceptors.request.eject(reqInterceptor);
   //              axios.interceptors.request.eject(resInterceptor);
   //          }
   //      }, [reqInterceptor, resInterceptor]);
   //
   //
   //      const errorConfirmedHandler = () => {
   //          setError(null);
   //      };

            return (
                <Aux>
                    <Modal show={error}
                           // modalClosed={errorConfirmedHandler}>
                            modalClosed={clearError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            )
        }
};

export default withErrorHandler;