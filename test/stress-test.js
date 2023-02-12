
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 10000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  var id = Math.floor(Math.random()* 1000011) + 1;
  http.get(`http://localhost:3001/questions?product_id=${id}`);
  // sleep(1);
}

// http.get('http://localhost:3001/questions/1/answers');
