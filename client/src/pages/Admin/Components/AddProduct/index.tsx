import { NumberInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import Button from "../../../../components/Button"
import { useState } from 'react';
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

function Demo() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  return (
    <div>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
      
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>
    </div>
  );
}
export default function AddProduct(){
    const form = useForm({
        initialValues:{
            title: "",
            description: "",
            price: 0,
            category: "",
            images:[],
            oldPrice: 0,
            availableQuantity: 0,
            size: [],
            options: [],
        }
    })

    const handleSubmit = (values: any) =>{
        return values
    }
    return <>
        <div>
            <form onSubmit = { form.onSubmit( (values) => handleSubmit(values))}>
                <TextInput
                    radius = "lg"
                    placeholder = "Title"
                    {...form.getInputProps("title")}
                    
                />
                <TextInput
                    radius = "lg"
                    placeholder = "Description"
                    {...form.getInputProps("description")}
                    
                />
                <TextInput
                    radius = "lg"
                    placeholder = "Category"
                    {...form.getInputProps("category")}
                    
                />
                <NumberInput
                    radius = "lg"
                    placeholder = "Price"
                    {...form.getInputProps("price")}
                    
                />
                <NumberInput
                    radius = "lg"
                    placeholder = "Discounted Price"
                    {...form.getInputProps("oldPrice")}
                    
                />
                <TextInput
                    radius = "lg"
                    placeholder = "Size"
                    {...form.getInputProps("size")}
                    
                />
                <TextInput
                    radius = "lg"
                    placeholder = "Options"
                    {...form.getInputProps("option")}
                    
                />
                <Demo />
                <Button
                    type = "submit"
                >
                    Add Product
                </Button>


            </form>
        </div>
    </>
}