export default [
  {
    name: '주인공 만들기',
    desc: '이야기의 주인공을 만드는 AI 도구',
    category: '캐릭터',
    icon: 'https://cdn-icons-png.flaticon.com/128/3227/3227076.png',
    aiPrompt: `다음 정보를 바탕으로 독특하고 매력적인 이야기 주인공을 만들어주세요:

1. 캐릭터 유형: {characterType}
2. 성격 특성: {personality}
3. 특별한 능력 또는 특징: {specialAbility}
4. 외모 설명: {appearance}
5. 배경 이야기: {backstory}

이 정보를 활용하여 5-7문장으로 주인공을 소개해주세요. 주인공의 이름, 나이, 생김새, 성격, 특별한 능력, 좋아하는 것과 싫어하는 것, 그리고 간단한 배경 이야기를 포함해주세요. 아이들의 상상력을 자극할 수 있도록 재미있고 독특한 요소를 추가해주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'character-creator',
    form: [
      {
        label: '캐릭터 유형을 선택하세요',
        field: 'select',
        name: 'characterType',
        options: ['동물', '사람', '로봇', '요정', '괴물', '가상의 생물'],
        required: true,
      },
      {
        label: '성격 특성을 선택하세요 (여러 개 선택 가능)',
        field: 'multiSelect',
        name: 'personality',
        options: [
          '용감한',
          '수줍은',
          '호기심 많은',
          '장난꾸러기',
          '다정한',
          '고집 센',
          '영리한',
        ],
        required: true,
      },
      {
        label: '특별한 능력이나 특징을 입력하세요',
        field: 'input',
        name: 'specialAbility',
        required: true,
      },
      {
        label: '외모를 간단히 설명해주세요',
        field: 'textarea',
        name: 'appearance',
        required: true,
      },
      {
        label: '간단한 배경 이야기를 입력하세요',
        field: 'textarea',
        name: 'backstory',
        required: false,
      },
    ],
  },
  {
    name: '이야기 배경 설정',
    desc: '이야기의 배경을 만드는 AI 도구',
    category: '세계관',
    icon: 'https://cdn-icons-png.flaticon.com/128/2276/2276742.png',
    aiPrompt: `다음 정보를 바탕으로 독특하고 흥미로운 이야기 배경을 만들어주세요:

1. 환경 유형: {environmentType}
2. 시간대/시대: {timePeriod}
3. 날씨/계절: {weatherSeason}
4. 특별한 요소: {specialElement}
5. 분위기: {atmosphere}

이 정보를 활용하여 6-8문장으로 이야기의 배경을 설명해주세요. 장소의 모습, 소리, 냄새, 느낌 등 감각적인 세부 사항을 포함하여 생생하게 묘사해주세요. 아이들이 그 세계에 빠져들 수 있도록 상상력을 자극하는 독특하고 매력적인 요소들을 추가해주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'story-setting-creator',
    form: [
      {
        label: '환경 유형을 선택하세요',
        field: 'select',
        name: 'environmentType',
        options: [
          '숲',
          '바다',
          '우주',
          '도시',
          '산',
          '사막',
          '정글',
          '눈 덮인 땅',
        ],
        required: true,
      },
      {
        label: '시간대/시대를 선택하세요',
        field: 'select',
        name: 'timePeriod',
        options: ['현재', '미래', '과거', '판타지 시대', '빙하기', '공룡 시대'],
        required: true,
      },
      {
        label: '날씨/계절을 선택하세요',
        field: 'select',
        name: 'weatherSeason',
        options: [
          '맑은 봄',
          '뜨거운 여름',
          '쌀쌀한 가을',
          '눈 내리는 겨울',
          '비 오는 날',
          '안개 낀 날',
        ],
        required: true,
      },
      {
        label: '특별한 요소를 추가하세요',
        field: 'input',
        name: 'specialElement',
        required: true,
      },
      {
        label: '분위기를 선택하세요',
        field: 'select',
        name: 'atmosphere',
        options: [
          '신비로운',
          '밝고 즐거운',
          '모험적인',
          '조용하고 평화로운',
          '긴장감 넘치는',
        ],
        required: true,
      },
    ],
  },
  {
    name: '주인공의 목표 설정',
    desc: '주인공의 소원이나 목표를 정하는 AI 도구',
    category: '플롯',
    icon: 'https://cdn-icons-png.flaticon.com/128/1006/1006555.png',
    aiPrompt: `다음 정보를 바탕으로 주인공의 흥미로운 소원이나 목표를 만들어주세요:

1. 목표 유형: {goalType}
2. 동기: {motivation}
3. 시간 제한: {timeLimit}
4. 장애물: {obstacle}
5. 성취 시 보상: {reward}

이 정보를 활용하여 5-7문장으로 주인공의 소원이나 목표를 설명해주세요. 목표의 내용, 그 목표를 갖게 된 이유, 목표 달성의 어려움, 목표 달성 시 예상되는 결과 등을 포함해주세요. 아이들이 주인공의 여정에 공감하고 응원할 수 있도록 감동적이고 흥미진진한 요소를 추가해주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'character-goal-setter',
    form: [
      {
        label: '목표 유형을 선택하세요',
        field: 'select',
        name: 'goalType',
        options: [
          '모험',
          '친구 만들기',
          '문제 해결',
          '꿈 이루기',
          '비밀 찾기',
          '세상 구하기',
        ],
        required: true,
      },
      {
        label: '주인공의 동기를 입력하세요',
        field: 'textarea',
        name: 'motivation',
        required: true,
      },
      {
        label: '시간 제한이 있다면 입력하세요',
        field: 'input',
        name: 'timeLimit',
        required: false,
      },
      {
        label: '목표 달성을 방해하는 장애물을 입력하세요',
        field: 'textarea',
        name: 'obstacle',
        required: true,
      },
      {
        label: '목표 달성 시 얻게 될 보상을 입력하세요',
        field: 'textarea',
        name: 'reward',
        required: true,
      },
    ],
  },
  {
    name: '이야기 갈등 만들기',
    desc: '이야기의 갈등 요소를 만드는 AI 도구',
    category: '플롯',
    icon: 'https://cdn-icons-png.flaticon.com/128/3048/3048363.png',
    aiPrompt: `다음 정보를 바탕으로 이야기에 긴장감을 더하는 흥미진진한 갈등 요소를 만들어주세요:

1. 갈등 유형: {conflictType}
2. 주요 장애물: {mainObstacle}
3. 적대적 캐릭터 (있다면): {antagonist}
4. 주인공의 약점: {weakness}
5. 갈등의 강도: {intensity}

이 정보를 활용하여 6-8문장으로 이야기의 갈등 상황을 설명해주세요. 갈등이 어떻게 시작되었는지, 주인공에게 어떤 영향을 미치는지, 어떤 선택이나 도전에 직면하게 되는지 등을 포함해주세요. 아이들이 긴장감을 느끼면서도 너무 무섭지 않도록 적절한 수준의 갈등을 만들어주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'story-conflict-creator',
    form: [
      {
        label: '갈등 유형을 선택하세요',
        field: 'select',
        name: 'conflictType',
        options: [
          '자연재해',
          '적대적 캐릭터',
          '내적 갈등',
          '시간 제한',
          '미스터리',
          '도덕적 딜레마',
        ],
        required: true,
      },
      {
        label: '주요 장애물을 설명해주세요',
        field: 'textarea',
        name: 'mainObstacle',
        required: true,
      },
      {
        label: '적대적 캐릭터가 있다면 설명해주세요',
        field: 'textarea',
        name: 'antagonist',
        required: false,
      },
      {
        label: '주인공의 약점을 입력하세요',
        field: 'input',
        name: 'weakness',
        required: true,
      },
      {
        label: '갈등의 강도를 선택하세요',
        field: 'select',
        name: 'intensity',
        options: ['약함', '보통', '강함'],
        required: true,
      },
    ],
  },
  {
    name: '문제 해결 방법 찾기',
    desc: '주인공이 문제를 해결하는 방법을 만드는 AI 도구',
    category: '플롯',
    icon: 'https://cdn-icons-png.flaticon.com/128/2729/2729007.png',
    aiPrompt: `다음 정보를 바탕으로 주인공이 문제를 해결하는 창의적이고 흥미로운 방법을 만들어주세요:

1. 해결 방식: {solutionType}
2. 주인공의 강점: {strength}
3. 도움을 주는 요소: {helpfulElement}
4. 극복해야 할 도전: {challenge}
5. 해결 과정의 단계 수: {steps}

이 정보를 활용하여 7-9문장으로 주인공이 문제를 해결해 나가는 과정을 설명해주세요. 각 단계에서 주인공이 어떤 행동을 취하는지, 어떤 깨달음을 얻는지, 어떻게 성장하는지 등을 포함해주세요. 아이들이 문제 해결 과정에서 창의성, 인내심, 용기 등의 가치를 배울 수 있도록 해주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'problem-solving-method-creator',
    form: [
      {
        label: '해결 방식을 선택하세요',
        field: 'select',
        name: 'solutionType',
        options: [
          '지혜 사용',
          '협력',
          '새로운 기술 습득',
          '용기 내기',
          '창의적 발상',
          '인내심 발휘',
        ],
        required: true,
      },
      {
        label: '주인공의 강점을 입력하세요',
        field: 'input',
        name: 'strength',
        required: true,
      },
      {
        label: '문제 해결에 도움을 주는 요소를 입력하세요',
        field: 'textarea',
        name: 'helpfulElement',
        required: true,
      },
      {
        label: '해결 과정에서 극복해야 할 도전을 설명해주세요',
        field: 'textarea',
        name: 'challenge',
        required: true,
      },
      {
        label: '해결 과정의 단계 수를 선택하세요',
        field: 'select',
        name: 'steps',
        options: ['3', '4', '5', '6'],
        required: true,
      },
    ],
  },
  {
    name: '이야기 결말 만들기',
    desc: '이야기의 결말과 교훈을 만드는 AI 도구',
    category: '플롯',
    icon: 'https://cdn-icons-png.flaticon.com/128/2958/2958783.png',
    aiPrompt: `다음 정보를 바탕으로 감동적이고 의미 있는 이야기 결말을 만들어주세요:

1. 결말 분위기: {endingMood}
2. 주인공의 변화: {characterGrowth}
3. 핵심 교훈: {mainLesson}
4. 남은 과제 (있다면): {remainingTask}
5. 미래 암시: {futureSuggestion}

이 정보를 활용하여 8-10문장으로 이야기의 결말을 설명해주세요. 주인공이 어떻게 성장했는지, 무엇을 깨달았는지, 주변 인물들에게 어떤 영향을 미쳤는지 등을 포함해주세요. 아이들이 이야기를 통해 긍정적인 메시지를 얻고, 스스로의 삶에 적용할 수 있는 교훈을 발견할 수 있도록 해주세요. 결말이 너무 뻔하지 않으면서도 아이들에게 희망과 용기를 줄 수 있는 내용으로 만들어주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'story-ending-creator',
    form: [
      {
        label: '결말의 분위기를 선택하세요',
        field: 'select',
        name: 'endingMood',
        options: ['행복한', '감동적인', '희망적인', '성찰적인', '열린 결말'],
        required: true,
      },
      {
        label: '주인공의 성장이나 변화를 설명해주세요',
        field: 'textarea',
        name: 'characterGrowth',
        required: true,
      },
      {
        label: '이야기의 핵심 교훈을 입력하세요',
        field: 'textarea',
        name: 'mainLesson',
        required: true,
      },
      {
        label: '해결되지 않은 과제가 있다면 설명해주세요',
        field: 'textarea',
        name: 'remainingTask',
        required: false,
      },
      {
        label: '미래에 대한 암시나 가능성을 입력하세요',
        field: 'textarea',
        name: 'futureSuggestion',
        required: true,
      },
    ],
  },
  {
    name: '이야기 제목 만들기',
    desc: '매력적인 동화 제목을 만드는 AI 도구',
    category: '기타',
    icon: 'https://cdn-icons-png.flaticon.com/128/3721/3721621.png',
    aiPrompt: `다음 정보를 바탕으로 아이들의 호기심을 자극하는 매력적인 동화 제목을 만들어주세요:

1. 주인공 특징: {protagonistFeature}
2. 이야기 배경: {storyBackground}
3. 주요 사건/모험: {mainEvent}
4. 이야기 분위기: {storyMood}
5. 대상 연령층: {targetAge}

이 정보를 활용하여 3-5개의 제목 후보를 제시해주세요. 각 제목에 대해 1-2문장으로 그 제목을 선택한 이유나 제목에 담긴 의미를 설명해주세요. 제목은 간결하면서도 이야기의 핵심을 담고 있어야 하며, 아이들의 상상력을 자극할 수 있어야 합니다. 운율이나 언어유희를 사용하여 기억하기 쉽고 재미있는 제목을 만들어주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'story-title-creator',
    form: [
      {
        label: '주인공의 특징을 간단히 설명해주세요',
        field: 'input',
        name: 'protagonistFeature',
        required: true,
      },
      {
        label: '이야기의 주요 배경을 입력하세요',
        field: 'input',
        name: 'storyBackground',
        required: true,
      },
      {
        label: '가장 중요한 사건이나 모험을 설명해주세요',
        field: 'textarea',
        name: 'mainEvent',
        required: true,
      },
      {
        label: '이야기의 전체적인 분위기를 선택하세요',
        field: 'select',
        name: 'storyMood',
        options: ['모험적인', '따뜻한', '신비로운', '재미있는', '교훈적인'],
        required: true,
      },
      {
        label: '주요 대상 연령층을 선택하세요',
        field: 'select',
        name: 'targetAge',
        options: ['5-7세', '8-10세', '11-13세'],
        required: true,
      },
    ],
  },
  {
    name: '삽화 아이디어 제안',
    desc: '동화 삽화 아이디어를 제안하는 AI 도구',
    category: '시각화',
    icon: 'https://cdn-icons-png.flaticon.com/128/3659/3659998.png',
    aiPrompt: `다음 정보를 바탕으로 동화의 핵심 장면을 위한 삽화 아이디어를 제안해주세요:

1. 장면 설명: {sceneDescription}
2. 등장 캐릭터: {characters}
3. 주요 감정/분위기: {mood}
4. 중요한 세부 사항: {importantDetails}
5. 색상 테마: {colorTheme}

이 정보를 활용하여 해당 장면의 삽화에 대한 상세한 설명을 7-9문장으로 제공해주세요. 구도, 캐릭터들의 위치와 표정, 주변 환경, 중요한 소품 등을 자세히 설명해주세요. 아이들의 상상력을 자극하고 이야기의 분위기를 잘 전달할 수 있는 시각적 요소들을 제안해주세요. 또한 이 삽화가 이야기의 전개나 캐릭터의 감정을 어떻게 효과적으로 전달할 수 있는지 설명해주세요. 답변 양식은 Rich Text Editor Format으로 해주세요.`,
    slug: 'illustration-idea-generator',
    form: [
      {
        label: '삽화로 그리고 싶은 장면을 설명해주세요',
        field: 'textarea',
        name: 'sceneDescription',
        required: true,
      },
      {
        label: '장면에 등장하는 캐릭터들을 나열해주세요',
        field: 'input',
        name: 'characters',
        required: true,
      },
      {
        label: '장면의 주요 감정이나 분위기를 선택하세요',
        field: 'select',
        name: 'mood',
        options: ['기쁨', '슬픔', '긴장', '평화', '놀람', '신비'],
        required: true,
      },
      {
        label: '반드시 포함해야 할 중요한 세부 사항을 설명해주세요',
        field: 'textarea',
        name: 'importantDetails',
        required: true,
      },
      {
        label: '주요 색상 테마를 선택하세요',
        field: 'multiSelect',
        name: 'colorTheme',
        options: [
          '밝은 색상',
          '어두운 색상',
          '파스텔 톤',
          '원색',
          '차가운 색상',
          '따뜻한 색상',
        ],
        required: true,
      },
    ],
  },
]
