import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import dynamic from 'next/dynamic'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'

import {
    contractAddress, ownerAddress
  } from "../config"
  
import Blog from '../artifacts/contracts/Blog.sol/Blog.json'
  
const client = create('https://ipfs.infura.io:5001/api/v0')

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false}
)

const initialState = { title: '', content: ''}

function CreatePost() {
    const [post, setPost] = useState(initialState)
    const [image, setImage] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 500)
    }, [])

    function onChange(e) {
        setPost(() => ({ ...post, [e.target.name]: e.target.value}))
    }

    async function savePostToIpfs() {
        try {
            const added = await client.add(JSON.stringify(post))
            return added.path
        } catch (err) {
            console.log('error: ', err)
        }
    }
}

export default CreatePost
