jQuery(document).ready(function ($) {
    // ДЛЯ DISABLED КНОПКИ, ЕСЛИ ЧЕКБОКС В ФОРМЕ НЕ CHECKED
    $('.form__confirm input').click(function () {
        var isChecked = $(this).prop('checked');
        var $submitButton = $(this).closest('.form').find('button[type="submit"]');
        $submitButton.prop('disabled', !isChecked);
    });

    // ДЛЯ ОТКРЫТИЯ МОДАЛКИ
    function openModalOrMenu(trigger, targetSelector) {
        $(trigger).addClass('active');
        $('body').css('overflow-y', 'hidden');
        $(targetSelector).on('click', function (e) {
            if (e.target === this) {
                $(this).removeClass('active');
                $('body').css('overflow-y', 'hidden');
            }
        });
    }

    flatpickr("#datePicker", {
        locale: "ru",
        dateFormat: "d.m.Y", 
        defaultDate: new Date(), 
    });

    flatpickr("#timePicker", {
        enableTime: true,
        noCalendar: true, 
        dateFormat: "H:i",
        time_24hr: true, 
        defaultHour: 14, 
        defaultMinute: 30, 
    });

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ
    function closeModalOrMenu(trigger) {
        $(trigger).removeClass('active');
        $('body').css('overflow-y', 'initial');
    }

    // ДЛЯ ВЫБОРА HREF ДЛЯ МОДАЛКИ
    $('a.getModal').on('click', function (e) {
        e.preventDefault();
        let triggerHref = $(this).attr('href');
        openModalOrMenu(triggerHref, triggerHref);
    });

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ
    $('.modal__close').on('click', function () {
        closeModalOrMenu($(this).parents('.modal'));
    });

    // ДЛЯ ЗАКРЫТИЯ МОБИЛЬНОГО МЕНЮ
    $('.mobile-menu__close, .mobile-menu, .mobile-menu a').on('click', function () {
        closeModalOrMenu($(this).parents('.mobile-menu'));
    });

    // toggler ДЛЯ АККОРДИОНА
    $('.accordion__item').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active')
    })

    function createTab(tabSelector, containerSelector) {
        $(containerSelector).each(function () {
            const $container = $(this);
            const $tabs = $container.find(tabSelector);
            const $contents = $container.find('.choose__main');

            $tabs.each(function (index) {
                $(this).on('click', function (e) {
                    e.preventDefault();

                    $tabs.removeClass('active');
                    $(this).addClass('active');

                    $contents.removeClass('active');
                    $contents.eq(index).addClass('active');
                });
            });
        });
    }

    createTab('.choose__tab', '.choose__container');
});


// МАСКА ДЛЯ ТЕЛЕФОНА В input[type='tel']
let maskedPhones = document.querySelectorAll("input[type='tel']");
for (var i = 0; i < maskedPhones.length; i++) {
    new IMask(maskedPhones[i], {
        mask: '+{7} (000) 000-00-00',
        placeholder: {
            show: 'always'
        }
    });
}


// ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ - УНИВЕРСАЛЬНЫЙ
let body = document.querySelector('body')
function closeModal(modalName, reverse = false) {
    modalName = document.querySelector(modalName)
    window.addEventListener('click', function (e) {
        if (reverse) {
            if (e.target === modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        } else {
            if (e.target !== modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        }

    })
}
closeModal('.modal', true)
closeModal('.mobile-menu', true)


// ФУНКЦИЯ ДЛЯ ТАБОВ
function createTabs(tabName, contentName) {
    tabName = document.querySelectorAll(tabName);
    contentName = document.querySelectorAll(contentName);
    let tabsArray = Array.from(tabName)
    tabsArray.map((tab, tabIndex) => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            for (let tabAll of tabName) tabAll.classList.remove('active')
            this.classList.add('active')

            for (let tabsContents of contentName) tabsContents.classList.remove('active')
            contentName[tabIndex].classList.add('active')
        })
    })
}
createTabs('.choose__select', '.choose__container')


// ДЛЯ ОТОБРАЖЕНИЯ КАРТЫ
function init() {
    let myMap = new ymaps.Map('map', {
        center: [52.267675, 104.329717],
        zoom: 15,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
    myplacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [52.267675, 104.329717]
        },
        properties: {
            hintContent: 'Красноказачья улица, 131, Иркутск'
        }
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myMap.controls.add('rulerControl', {
        scaleLine: false
    });
    myMap.geoObjects.add(myplacemark);
}

document.addEventListener('DOMContentLoaded', function () {
    let mapElement = document.getElementById('map');

    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                ymaps.ready(init);
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1
    });

    if (mapElement) {
        observer.observe(mapElement);
    }
});

// SWIPER слайдеры
const suggestSlider = new Swiper('.suggest__slider', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    navigation: {
        prevEl: ".suggest .arrow--left",
        nextEl: ".suggest .arrow--right",
    },
    pagination: {
        el: '.suggest .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 10,
        },

        620: {
            slidesPerView: 1.2,
            centeredSlides: false,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 'auto',
            spaceBetween: 20,
        },

        1400: {
            slidesPerView: 'auto',
            spaceBetween: 20,
        },
    },
});

const reviewsSlider = new Swiper('.reviews__slider', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,

    navigation: {
        prevEl: ".reviews .arrow--left",
        nextEl: ".reviews .arrow--right",
    },
    pagination: {
        el: '.reviews .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 10,
        },

        768: {
            spaceBetween: 20,
            slidesPerView: 2,
        },

        1400: {
            slidesPerView: 3,
        },
    }
});
