import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
/*
  STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
  };*/

  constructor() { }

  createDb() {
    const users = [
      { id: 100, firstname: 'Charlie', lastname: 'Barber', email: 'cbarber@gmail.com', password: '150595', profession: 'Senior blog writer', token: ''},
      { id: 101, firstname: 'Momar', lastname: 'Mbengue', email: 'momarious@gmail.com', password: '150595', profession: 'Angular Develloper', token: ''}
    ];
    const blogs = [
      {
          id: 1,
          author: 'Mark Wiens',
          tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
          img: ['assets/img/blog/feature-img3.jpg', 'assets/img/b1.jpg'],
          title: 'Astronomy Binocuars A Great Alternative',
          excert: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
          content: '',
          date: '12 Dec, 2017',
          hour: '18:55',
          views: 1000000,
          comments: 26
      },
      {
          id: 2,
          author: 'Mark Wiens',
          tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
          img: ['assets/img/blog/feature-img2.jpg', 'assets/img/b2.jpg'],
          title: 'The Basics Of Buying A Telescope',
          excert: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
          content: '',
          date: '12 Dec, 2017',
          hour: '18:55',
          views: 10000,
          comments: 26
      },
      {
          id: 3,
          author: 'Mark Wiens',
          tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
          img: ['assets/img/blog/feature-img3.jpg', 'assets/img/b3.jpg'],
          title: 'The Glossary Of Telescopes',
          excert: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
          content: '',
          date: '12 Dec, 2017',
          hour: '18:55',
          views: 100,
          comments: 26
      },
      {
          id: 4,
          author: 'Mark Wiens',
          tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
          img: ['assets/img/blog/feature-img4.jpg', 'assets/img/b1.jpg'],
          title: 'The Night Sky',
          excert: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
          content: '',
          date: '12 Dec, 2017',
          hour: '18:55',
          views: 20000,
          comments: 26
      },
      {
          id: 5,
          author: 'Mark Wiens',
          tags: ['Food', 'Technology', 'Politics', 'Lifestyle'],
          img: ['assets/img/blog/feature-img5.jpg', 'assets/img/b2.jpg'],
          title: 'The Glossary Of Telescopes',
          excert: 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.',
          content: '',
          date: '12 Dec, 2017',
          hour: '18:55',
          views: 10000,
          comments: 26
    }];
    return {users, blogs};
  }

  // HTTP POST interceptor
  post(requestInfo: RequestInfo) {
    if (requestInfo.id === 'login') { return this.getUser(requestInfo); }
    if (requestInfo.id === 'signup') { return this.existsUser(requestInfo) ; }
    return undefined;
  }

  // HTTP GET interceptor
  get(requestInfo: RequestInfo) {
    if (requestInfo.collectionName === 'blogs') { return this.getBlogs(requestInfo); }
    return undefined;  // let the default GET handle all others
  }

  // HTTP GET interceptor handles requests for blogs
  private getBlogs(requestInfo: RequestInfo) {
    return requestInfo.utils.createResponse$(() => {
      const dataEncapsulation = requestInfo.utils.getConfig().dataEncapsulation;
      const collection = requestInfo.collection;
      const id = requestInfo.id;
      const data = id === undefined ? collection : requestInfo.utils.findById(collection, id);
      const options: ResponseOptions = data ?
      {
        body: dataEncapsulation ? { data } : data,
        status: 200
      } :
      {
        body: { error: `Post not found`},
        status: 404
      };

      options.statusText = options.status === 200 ? 'ok' : 'Not found';
      options.headers = requestInfo.headers;
      options.url = requestInfo.url;
      return options;
    });
  }

  // HTTP GET interceptor handles requests for users
  private getUser(requestInfo: RequestInfo) {
    return requestInfo.utils.createResponse$(() => {
      const dataEncapsulation = requestInfo.utils.getConfig().dataEncapsulation;
      const user = requestInfo.collection.find(model => {
          return requestInfo.req['body'].email === model.email && requestInfo.req['body'].password === model.password;
      });

      let responseBody = {};
      if (user) {
        responseBody = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          profession: user.profession,
          token: this.generateToken(user)
        };
      }

      const options: ResponseOptions = ( responseBody ) ?
        {
          body: dataEncapsulation ? { responseBody } : responseBody,
          status: STATUS.OK
        } :
        {
          body: { error: `'User' with email='${requestInfo.req['body'].email}' not found`},
          status: STATUS.NOT_FOUND
        };
      options.statusText = options.status === 200 ? 'OK' : 'Not found';
      options.headers = requestInfo.headers;
      options.url = requestInfo.url;
      return options;
    });
  }

  // HTTP GET interceptor handles requests for users
  private existsUser(requestInfo: RequestInfo) {
    const user = requestInfo.collection.find(model => {
          return requestInfo.req['body'].email === model.email && requestInfo.req['body'].password === model.password;
      });
    if (user) { return true; }
    return false;
  }

  generateToken(user: any) {
    return 'ab4f5a2c4930622664f2' ;
  }


}

      /**/

        /**
         * 
         * const options: ResponseOptions = responseBody;
      if (responseBody) {
        options.body = dataEncapsulation ? { responseBody } : responseBody;
        options.status = 200;
      } else {
        options.body = `'User' with email='${requestInfo.req['body'].email}' not found`;
        options.status = 404;
      }
         */