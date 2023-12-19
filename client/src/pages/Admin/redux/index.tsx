import { Action, Dispatch } from "redux";
import { ActionType } from "../../../state/action-types";
import axios from "axios";

const actionCreator = {
    login : (email: string, password: string) => {
        return async (dispatch: Dispatch<Action>) => {
            try {
            dispatch({
                type: ActionType.USER_LOGIN_REQUEST,
            });

            const config = {
                headers: {
                "Content-Type": "application/json",
                },
            };

            const formData = {
                email,
                password,
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/login`,
                formData,
                config
            );

            console.log( 'The token read back is \n', data.payload )

            
            } catch (error: any) {

                console.log("An error occurred")

                dispatch({
                    type: ActionType.USER_LOGIN_FAIL,
                    payload: error,
                });
            }
    
        }
    }
};


export default actionCreator