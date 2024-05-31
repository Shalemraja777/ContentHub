import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
                setFilteredPosts(response.data); // Initialize filtered posts with all posts
            }
        }
        fetchData();
    }, [category]);

    const handleSearch = (searchTerm) => {
        const filtered = posts.filter(post =>post.title.toLowerCase().includes(searchTerm.toLowerCase())|| post.username.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredPosts(filtered);
    };

    const handleChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        handleSearch(searchTerm);
    };

    return (
        <>
            <TextField
                label="Search by Username or title"
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
            />
            {
                filteredPosts?.length ? (
                    <Grid container spacing={2}>
                        {filteredPosts.map(post => (
                            <Grid item key={post._id} lg={3} sm={4} xs={12}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                                    <Post post={post} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                        No posts found for the specified username or title
                    </Box>
                )
            }
        </>
    );
};

export default Posts;
