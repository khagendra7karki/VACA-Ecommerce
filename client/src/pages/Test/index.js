import React, { useState } from 'react';

const Comment = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    addReply(replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={() => setShowReplyBox(!showReplyBox)}>
        Reply
      </button>
      {showReplyBox && (
        <div>
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Submit Reply</button>
        </div>
      )}
    </div>
  );
};

const NestedComment = ({ comment }) => {
  const [replies, setReplies] = useState([]);

  const addReply = replyText => {
    setReplies([...replies, { text: replyText }]);
  };

  return (
    <div style={{ paddingLeft: '16px' }}>
    <Comment comment={comment} addReply={addReply} />
      {replies.map((reply, i) => (
        <NestedComment key={i} comment={reply} />
      ))}
    </div>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  const addComment = () => {
    setComments([...comments, { text: newCommentText }]);
    setNewCommentText('');
  };

  return (
    <div>
      <input
        value={newCommentText}
        onChange={e => setNewCommentText(e.target.value)}
      />
      <button onClick={addComment}>Add Comment</button>
      {comments.map((comment, i) => (
        <NestedComment key={i} comment={comment} />
      ))}
    </div>
  );
};

const MainComment = () =>{
  return <>
    <p>Reddit like padding system</p>
  </>
}

export default function App() {
  return (
    <div className="App">
      <MainComment />
      <CommentSection />
    </div>
  );
}














































// import { useState } from "react"


// const exampleMainCommentObject = [{
//   commentId: 0,
//   comment: '',
//   childCommentOf: 0,
// }]

// const exampleCommentObject = {
//   commentId: 0,
//   comment: '',
//   childCommentOf: 0,
// }
// const standardPadding = 40

// function generateUniqueNumber(){
//   return (new Date()).getTime()
// }


// const MainComponent = () =>{
  
//   const [ mainComment, setMainComment ] = useState( [])

//   const [ newComment , setNewComment ] = useState('')

//   const addComment = (e) =>{
//     e.preventDefault()
//     setMainComment([...mainComment, { comment: newComment, commentId: generateUniqueNumber(), commentOf: 0}])
//     setNewComment('')
//   }

//   const handleChange = (e) =>{
//     setNewComment(e.target.value)    
//   }

//   return<>
//       <div style = {{paddingLeft: `${standardPadding}px`}}> 
//         <p>{'Some Random Comment'}</p>
//         <form onSubmit = {addComment }>
//           <input type = 'text' value = {newComment} onChange = {handleChange}/>
//           <button type = 'submit'>Add Comment</button>
//         </form>
//       </div>
//       <div>
//         { 
//         mainComment.length > 0 
//         &&
//         (
//           mainComment.map( (comment, idx) => <ChildComment key = {idx} commentObject = {comment} setMainComment={setMainComment} />)
//         )
//         }
//       </div>
//   </>
// }


// const ChildComment = ({ comments, setMainComment }) =>{
  
//   const [ newComment , setNewComment ] = useState('')

//   const addChildComment = (e) =>{
//     e.preventDefault(e)
    
//     setMainComment(prev =>{
//       return  [ ...prev, { commentId : generateUniqueNumber(), commentOf: commentObject.commentId, comment : newComment}]
//     })
//     setNewComment('')
//   }
  


//   const handleChange = (e) =>{
//     setNewComment(e.target.value)    
//   }
//   if(comments == [] )
//     return

//   return<>
    
//   </>
  //  <div style = {{paddingLeft: `${standardPadding}px`}}>
  //   <p>{commentObject.comment}</p>
  //   <form onSubmit = {addChildComment }>
  //     <input type = 'text' value = {newComment} onChange = {handleChange}/>
  //     <button type = 'submit'>Add Comment</button>
  //   </form>
  // </div>

// }

// export default function Test(){
//   return<>
//     <MainComponent>

//     </MainComponent>
//   </>
// }














































































// import axios from "axios"
// import { SyntheticEvent, useState } from "react"
// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Base64 from 'crypto-js/enc-base64';

// const secretKey = '8gBm/:&EnhH.1/q'  
// const encodedParameters = ( total_amount = 110, transaction_uuid= '11abc4a8f2b0264', product_code = 'EPAYTEST') =>{
//     var hash = hmacSHA256(`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`, secretKey  )
//     return Base64.stringify( hash );
//   }
// const exampleObject = {
//         "amount": "100",
//         "failure_url": "https://google.com",
//         "product_delivery_charge": "0",
//         "product_service_charge": "0",
//         "product_code": "EPAYTEST",
//         "signature": encodedParameters(),
//         "signed_field_names": "total_amount,transaction_uuid,product_code",
//         "success_url": "https://esewa.com.np",
//         "tax_amount": "10",
//         "total_amount": "110",
//         "transaction_uuid": "11abc4a8f2b0264"
//       }


// export default function () {
//   const [formData, setFormData]  = useState<typeof exampleObject >(exampleObject);

//   const handleChange = (e : React.ChangeEvent<HTMLInputElement> ) =>{
//     setFormData( (prev) =>{
//       // if (e.target.name === 'amount'){
//       //   prev.tax_amount = String (0.13 * parseInt(prev.amount));
//       //   total_amount = prev.amount + prev.product_delivery_charge + prev.product_service_charge + prev.tax_amount
//       // }
//       return { ...prev, [e.target.name]: e.target.value}
//     })
//   }
//     const handleSubmit = (e : SyntheticEvent) =>{
//       // e.preventDefault()
//       // setFormData((prev ) => {
//       //   const encodedData = encodedParameters( Number(prev.amount ))
//       //   console.log('From Set Form Data', encodedData )
//       //   return { ...prev, signature: encodedData}
//       // })

//       e.preventDefault();
//       submitForm(formData )


//     }

//     const submitForm = async( formData : typeof exampleObject ) =>{
//       try{
//         axios.post( 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',{ formData },{
//           withCredentials: false 
//         }).then( response => console.log( response )).catch( error => console.log(error))

//       }catch( error ){
//         console.log( error )
//       }
      
//       // window.location.href = 'https://rc-epay.esewa.com.np'
//     }

//     return <>
//       <form onSubmit = { handleSubmit } style = {{display: 'flex', flexDirection: 'column'}}>
//         <input onChange = { handleChange } type="text" id="amount" name="amount"  required  value = { formData.amount }/>
//         <input onChange = { handleChange } type="text" id="tax_amount" name="tax_amount"  required  value = { formData.tax_amount}/>
//         <input onChange = { handleChange } type="text" id="total_amount" name="total_amount" required  value = { formData.total_amount}/>
//         <input onChange = { handleChange } type="text" id="transaction_uuid" name="transaction_uuid"  value = { formData.transaction_uuid}/>
//         <input onChange = { handleChange } type="text" id="product_code" name="product_code" required  value = { formData.product_code}/>
//         <input onChange = { handleChange } type="text" id="product_service_charge" name="product_service_charge"  value = { formData.product_service_charge}/>
//         <input onChange = { handleChange } type="text" id="product_delivery_charge" name="product_delivery_charge"   value = { formData.product_delivery_charge}/>
//         {/* <input onChange = { handleChange } type="text" id="success_url" name="success_url" required  value = { formData.success_url}/> */}
//         {/* <input onChange = { handleChange } type="text" id="failure_url" name="failure_url" required  value = { formData.failure_url}/> */}
//         {/* <input onChange = { handleChange } type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required  value = { formData.}/> */}
//         {/* <input onChange = { handleChange } type="text" id="signature" name="signature" value = { formData.} /> */}
//         <input onChange = { handleChange } value="Submit" type="submit" />
//       </form>
//     </>
// }
