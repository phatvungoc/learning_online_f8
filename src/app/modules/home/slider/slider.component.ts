import { Component, OnDestroy, OnInit } from '@angular/core';

import { Slider } from './slider.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  sliders: Array<Slider> = [
    new Slider(
      'Học ReactJS Miễn Phí!',
      'Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS.',
      '/courses/707a0698-8e4f-4bcb-88f0-754c691108e7',
      'https://cdn.fullstack.edu.vn/f8-production/banners/Banner_web_ReactJS.png',
      'Đăng ký ngay'
    ),
    new Slider(
      'Thành Quả của Học Viên',
      'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
      '/',
      'https://cdn.fullstack.edu.vn/f8-production/banners/Banner_01_2.png',
      'Xem thành quả'
    ),
    new Slider(
      'F8 trên Youtube',
      'F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.',
      'https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw',
      'https://cdn.fullstack.edu.vn/f8-production/banners/Banner_03_youtube.png',
      'Truy cập kênh'
    ),
    new Slider(
      'F8 trên Facebook',
      'F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.',
      'https://www.facebook.com/groups/649972919142215',
      'https://cdn.fullstack.edu.vn/f8-production/banners/Banner_04_2.png',
      'Truy cập nhóm'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
