import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "@inertiajs/react";

export default function PostCard({ props }) {
    const { summary, subject } = props;
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success('URL copied to clipboard:', url);
        }).catch(err => {
            toast.error('Failed to copy the URL:', err);
        });
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={subject}
                height="140"
                image={props?.coverImage ?? props.cover.coverImage}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {summary.slice(0, 150).concat(summary.length > 150 ? '...' : '')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => copyToClipboard(route("post.show", { id: props.id }))} size="small">Share</Button>
                <Link href={route("post.show", { id: props.id })}>
                    <Button size="small">View More</Button>
                </Link>
            </CardActions>
        </Card >
    );
}
