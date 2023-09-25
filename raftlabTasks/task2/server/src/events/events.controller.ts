import axios from 'axios';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('events')
export class EventsController {
  BACKEND_GRAPHQL_BASE_URL: string =
    process.env.BACKEND_GRAPHQL_BASE_URL || 'http://localhost:8000';

  @Get()
  async getEvents(@Req() request: Request) {
    const token = request.headers.authorization;
    try {
      const response = await axios.post(
        `${this.BACKEND_GRAPHQL_BASE_URL}/graphql`,
        {
          query: `
            query {
                events {
                id
                title
                description
                completed
                userId
                }
            }
        `,
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      );
      return response.data.data.events;
    } catch (error) {
      throw new HttpException(
        { error: error?.response?.data || error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('create')
  async createEvent(@Req() request: Request) {
    const token = request.headers.authorization;
    const { title, description } = request.body;
    try {
      const response = await axios.post(
        `${this.BACKEND_GRAPHQL_BASE_URL}/graphql`,
        {
          query: `
          mutation CreateEvent($title: String!, $description: String) {
            createEvent(title: $title, description: $description) {
              id
              description
              title
              userId
              completed
            }
          }
        `,
          variables: {
            title,
            description,
          },
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      );
      return response.data.data.createEvent;
    } catch (error) {
      throw new HttpException(
        { error: error?.response?.data || error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('update')
  async updateEvent(@Req() request: Request) {
    const token = request.headers.authorization;
    const { eventId, title, description, completed } = request.body;
    try {
      const response = await axios.post(
        `${this.BACKEND_GRAPHQL_BASE_URL}/graphql`,
        {
          query: `
            mutation UpdateEvent(
              $eventId: ID!
              $title: String
              $description: String
              $completed: Boolean
            ) {
              updateEvent(id: $eventId, title: $title, description: $description, completed: $completed) {
                description
                id
                title
                completed
              }
            }
        `,
          variables: {
            eventId,
            title,
            description,
            completed,
          },
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      );
      return response?.data?.data?.updateEvent;
    } catch (error) {
      throw new HttpException(
        { error: error?.response?.data || error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete()
  async deleteEvent(@Req() request: Request) {
    const token = request.headers.authorization;
    const eventId = request.query.eventId;
    try {
      await axios.post(
        `${this.BACKEND_GRAPHQL_BASE_URL}/graphql`,
        {
          query: `
            mutation DeleteEvent($eventId: ID!) {
              deleteEvent(id: $eventId)
            }
        `,
          variables: {
            eventId,
          },
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      );
      const response = await axios.post(
        `${this.BACKEND_GRAPHQL_BASE_URL}/graphql`,
        {
          query: `
            query {
                events {
                id
                title
                description
                completed
                userId
                }
            }
        `,
        },
        {
          headers: { Authorization: token, 'Content-Type': 'application/json' },
        },
      );
      return response.data.data.events;
    } catch (error) {
      throw new HttpException(
        { error: error?.response?.data || error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
