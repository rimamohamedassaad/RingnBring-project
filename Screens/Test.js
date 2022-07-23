import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Test = () => {
  const [posts, setPosts] = useState([]);

  var url = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
        console.log("useEffect")

        const result = fetch(url)
        .then((response) => {
            console.log(response.json) // should display the data in the logs
        })
        .then((json) => {
            console.log(json);
        });

        console.log(result);
    })
  return (
    <View>
      <Text>Test</Text>
      {posts.map(post => (
        <View><Text> {post.data}</Text>
        </View>
      ))}
    </View>
  )
}

export default Test