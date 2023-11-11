import React, { SyntheticEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State, actionCreators, store } from '../../../state'
import { useForm } from '@mantine/form'
import { PasswordInput, TextInput } from '@mantine/core'
import { bindActionCreators } from 'redux'


const EditForm = ({ fullName, email, password }: { fullName: string, email: string, password: string}) =>{

    const dispatch = useDispatch();

    const { updateProfile } = bindActionCreators( actionCreators, dispatch )

    const handleSubmit = (values: any) =>{
        const { fullName, email, password } = values
        console.log('Submitted values are ', fullName, email, password )
        updateProfile( fullName, email, password )


    }
    const form = useForm({
        initialValues: {
            fullName,
            email,
            password 
        }})

    
    return <>
        <form onSubmit = { form.onSubmit(( values )=> handleSubmit( values ) )}>
            <TextInput 
                withAsterisk
                label = 'Full Name'
                placeholder = 'Enter your full Name'    
                {...form.getInputProps('fullName')}
            />
            <TextInput
                withAsterisk
                label = 'Email'
                placeholder = 'Enter your Email'
                { ...form.getInputProps('email')}
            />

            {/* <PasswordInput
                withAsterisk
                label = 'Password'
                { ...form.getInputProps('password')}
            /> */}
            <button type = 'submit'>
                Submit
            </button>
            

        </form>
    </>
}
const UserProfile: React.FC = () =>{
    const { userInfo } = useSelector( ( state: State) => state.user )




    const handleClick = (e: SyntheticEvent ) =>{
        console.log('Edit Profile Button has been clicked')

    }

    
    return <>
    <div>
        <h2>Full Name</h2>
        <h4> {userInfo.fullName}</h4>

        <h2> Email</h2>
        <h4> { userInfo.email }</h4>

        <h2> Phone Number </h2>
        <h4> { userInfo.phoneNumber  || 'No Phone number Provided' }</h4>

        <button onClick = { handleClick }>
            Edit Profile
        </button>

        <EditForm {...userInfo} />

        <button onClick = { handleClick }>
            Change Password
        </button>
    </div>   
    </>    

}
export default UserProfile