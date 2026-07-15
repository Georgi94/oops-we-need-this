export const OWNER_KEYS = ['macinka', 'zhorzhi'];

export const EMOJI_CHOICES = [
  '💛',
  '💚',
  '📝',
  '🌸',
  '🛒',
  '🎬',
  '🍓',
  '✈️',
  '🎁',
  '⭐',
];

/**
 * Class strings must stay literal (no interpolation) so the Tailwind v4
 * scanner can see every utility in this file.
 */
export const OWNERS = {
  macinka: {
    displayName: 'Мацинка',
    heartEmoji: '💛',
    emptyMessage: 'Още няма списъчета… направи първото! ✨',
    surfaceClass: 'border-macinka-border bg-macinka-surface',
    cardClass: 'border-macinka-border bg-macinka-card',
    inkClass: 'text-macinka-ink',
    badgeClass: 'bg-macinka-soft text-macinka-ink',
    accentButtonClass:
      'bg-macinka-accent text-macinka-accent-ink focus-visible:ring-macinka-ink',
    ghostButtonClass:
      'text-macinka-ink hover:bg-macinka-soft focus-visible:ring-macinka-ink',
    inputClass:
      'border-macinka-border bg-card focus-visible:border-macinka-accent focus-visible:ring-macinka-accent',
    emojiRadioClass:
      'peer-checked:border-macinka-accent peer-checked:bg-macinka-soft peer-focus-visible:ring-2 peer-focus-visible:ring-macinka-accent',
    checkboxClass:
      'border-macinka-border text-macinka-accent-ink peer-checked:border-macinka-accent peer-checked:bg-macinka-accent peer-focus-visible:ring-2 peer-focus-visible:ring-macinka-accent',
    trackClass: 'bg-macinka-soft',
    barClass: 'bg-macinka-accent',
    pageClass: 'bg-macinka-surface',
    ringClass: 'focus-visible:ring-macinka-accent',
    dividerClass: 'divide-macinka-border',
  },
  zhorzhi: {
    displayName: 'Жоржи',
    heartEmoji: '💚',
    emptyMessage: 'Тук е празничко… време е за първи списък! 🌱',
    surfaceClass: 'border-zhorzhi-border bg-zhorzhi-surface',
    cardClass: 'border-zhorzhi-border bg-zhorzhi-card',
    inkClass: 'text-zhorzhi-ink',
    badgeClass: 'bg-zhorzhi-soft text-zhorzhi-ink',
    accentButtonClass:
      'bg-zhorzhi-accent text-zhorzhi-accent-ink focus-visible:ring-zhorzhi-ink',
    ghostButtonClass:
      'text-zhorzhi-ink hover:bg-zhorzhi-soft focus-visible:ring-zhorzhi-ink',
    inputClass:
      'border-zhorzhi-border bg-card focus-visible:border-zhorzhi-accent focus-visible:ring-zhorzhi-accent',
    emojiRadioClass:
      'peer-checked:border-zhorzhi-accent peer-checked:bg-zhorzhi-soft peer-focus-visible:ring-2 peer-focus-visible:ring-zhorzhi-accent',
    checkboxClass:
      'border-zhorzhi-border text-zhorzhi-accent-ink peer-checked:border-zhorzhi-accent peer-checked:bg-zhorzhi-accent peer-focus-visible:ring-2 peer-focus-visible:ring-zhorzhi-accent',
    trackClass: 'bg-zhorzhi-soft',
    barClass: 'bg-zhorzhi-accent',
    pageClass: 'bg-zhorzhi-surface',
    ringClass: 'focus-visible:ring-zhorzhi-accent',
    dividerClass: 'divide-zhorzhi-border',
  },
};
